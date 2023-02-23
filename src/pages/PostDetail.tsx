import { Box, Drawer, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentApi, postApi } from '~/api';
import { PostComment, PostDetail, PostReaction } from '~/components/post';
import { PostDetailSkeleton } from '~/components/skeletons';
import { APP_NAME } from '~/constants';
import { usePageTitle } from '~/hooks';
import { Comment, CommentActionTypes, Post } from '~/models';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { commentActions, fetchPostComments, selectPostComments } from '~/store/slices/commentSlice';
import {
  fetchPostDetail,
  postActions,
  selectPostDetail,
  selectPostLoading,
} from '~/store/slices/postSlice';
import { selectSocket } from '~/store/slices/socketSlice';
import { showErrorToastFromServer } from '~/utils/toast';

export function PostDetailPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const post = useAppSelector(selectPostDetail);
  const postComments = useAppSelector(selectPostComments);

  const socket = useAppSelector(selectSocket);

  const [openComment, setOpenComment] = useState(false);

  const pageTitle = loading ? APP_NAME : `${post?.title} | ${post?.author?.name}`;
  usePageTitle(pageTitle, false);

  useEffect(() => {
    if (!slug) return;
    dispatch(fetchPostDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinPost', { postId: post?._id });

    return () => {
      socket.emit('leavePost', { postId: post?._id });
    };
  }, [socket, post]);

  useEffect(() => {
    if (!post) return;

    if (openComment) {
      dispatch(fetchPostComments(post?._id!));
    }
  }, [openComment]);

  const closeComment = () => setOpenComment(false);

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id!);
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id!);
  };

  const handleLikePost = async () => {
    try {
      const response = await postApi.like(post?._id!);
      dispatch(postActions.updatePostDetail(response));
    } catch (error) {
      showErrorToastFromServer(error);
    }
  };

  const handleCommentAction = async (action: CommentActionTypes, comment: Comment) => {
    if (action === 'like') {
      const response = await commentApi.like(comment._id!);
      dispatch(commentActions.updateComment(response));
      return;
    }
    await commentApi[action](comment);
  };

  const updateCommentCount = (count: number) => {
    dispatch(postActions.updatePostDetail({ commentCount: count }));
  };

  return (
    <Grid container spacing={{ xs: 2, lg: 8 }} flexDirection={{ xs: 'column', lg: 'row' }}>
      <Grid item xs lg={8} width="100%">
        {loading ? (
          <PostDetailSkeleton />
        ) : (
          <PostDetail post={post} onSave={handleSavePost} onDelete={handleDeletePost} />
        )}
      </Grid>

      <Grid item xs lg={4} width="100%">
        <Box position="sticky" top={96} mb={3}>
          <PostReaction
            post={post}
            onOpenComment={() => setOpenComment(true)}
            onLikePost={handleLikePost}
          />
        </Box>
      </Grid>

      <Drawer anchor="right" open={openComment} onClose={closeComment}>
        <PostComment
          commentList={postComments}
          postId={post?._id ?? ''}
          onClose={closeComment}
          updateCommentCount={updateCommentCount}
          onCommentAction={handleCommentAction}
        />
      </Drawer>
    </Grid>
  );
}
