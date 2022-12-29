import { Box, Drawer, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentApi, postApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { PostComment, PostDetail, PostReaction } from '~/components/post';
import { PostDetailSkeleton } from '~/components/skeletons';
import { APP_NAME } from '~/constants';
import { commentActions, selectPostComments } from '~/redux/slices/commentSlice';
import { postActions, selectPostDetail, selectPostLoading } from '~/redux/slices/postSlice';
import { selectSocket } from '~/redux/slices/socketSlice';
import { usePageTitle } from '~/hooks';
import { Comment, CommentActionTypes, Post } from '~/models';

export function PostDetailPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const post = useAppSelector(selectPostDetail);
  const postComments = useAppSelector(selectPostComments);

  const socket = useAppSelector(selectSocket);

  const [openComment, setOpenComment] = useState(false);

  usePageTitle(loading ? APP_NAME : `${post?.title} | ${post?.author?.name}`);

  useEffect(() => {
    if (!slug) return;
    dispatch(postActions.fetchPostDetail(slug));
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
      dispatch(commentActions.fetchPostComments(post?._id || ''));
    }
  }, [openComment]);

  const closeComment = () => setOpenComment(false);

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id || '');
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id || '');
  };

  const handleLikePost = () => {
    dispatch(postActions.likePost(post?._id || ''));
  };

  const handleCommentAction = async (action: CommentActionTypes, comment: Comment) => {
    if (action === 'like') {
      dispatch(commentActions.like(comment._id || ''));
      return;
    }
    await commentApi[action](comment);
  };

  const updateCommentCount = (count: number) => {
    dispatch(postActions.updateCommentCount(count));
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
