import { Box, Drawer, Grid } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentApi, postApi } from '~/api';
import { PostComments, PostDetail, PostReaction } from '~/components/post';
import { PostDetailSkeleton } from '~/components/skeletons';
import { APP_NAME } from '~/constants';
import { usePageTitle } from '~/hooks/common';
import { usePostDetail } from '~/hooks/queries';
import { usePostSocket } from '~/hooks/socket';
import { Comment, CommentActionTypes, Post } from '~/models';
import { useAppDispatch } from '~/store/hooks';
import { commentActions } from '~/store/slices/commentSlice';
import { postActions } from '~/store/slices/postSlice';

export function PostDetailPage() {
  const { slug = '' } = useParams();

  const dispatch = useAppDispatch();

  const [openComment, setOpenComment] = useState(false);

  const { data: post, isLoading } = usePostDetail(slug);
  usePostSocket(post?._id);

  const pageTitle = isLoading ? APP_NAME : `${post?.title} | ${post?.author?.name}`;
  usePageTitle(pageTitle, false);

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
    } catch (error) {}
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
        {isLoading || !post ? (
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
        <PostComments
          postId={post?._id ?? ''}
          onClose={closeComment}
          updateCommentCount={updateCommentCount}
          onCommentAction={handleCommentAction}
        />
      </Drawer>
    </Grid>
  );
}
