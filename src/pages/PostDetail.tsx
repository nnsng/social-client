import { Box, Drawer, Grid } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentApi } from '~/api';
import { PostComments, PostDetail, PostReaction } from '~/components/post';
import { PostDetailSkeleton } from '~/components/skeletons';
import { APP_NAME } from '~/constants';
import { usePageTitle } from '~/hooks/common';
import { useDeletePost, useLikePost, usePostDetail, useSavePost } from '~/hooks/post';
import { usePostSocket } from '~/hooks/socket';
import { Comment, CommentActionTypes } from '~/models';
import { useAppDispatch } from '~/store/hooks';
import { commentActions } from '~/store/slices/commentSlice';
import { postActions } from '~/store/slices/postSlice';

export function PostDetailPage() {
  const { slug = '' } = useParams();

  const dispatch = useAppDispatch();

  const [openComment, setOpenComment] = useState(false);

  const { data: post, isLoading, refetch } = usePostDetail(slug);
  usePostSocket(post?._id);

  const { mutate: deletePost } = useDeletePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: likePost } = useLikePost(slug, {
    onSuccess: () => refetch(),
  });

  const pageTitle = isLoading ? APP_NAME : `${post?.title} | ${post?.author?.name}`;
  usePageTitle(pageTitle, false);

  const closeComment = () => setOpenComment(false);

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
          <PostDetail
            post={post}
            onSave={(post) => savePost(post._id!)}
            onDelete={(post) => deletePost(post._id!)}
          />
        )}
      </Grid>

      <Grid item xs lg={4} width="100%">
        <Box position="sticky" top={96} mb={3}>
          <PostReaction
            post={post}
            onOpenComment={() => setOpenComment(true)}
            onLikePost={() => likePost(post?._id!)}
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
