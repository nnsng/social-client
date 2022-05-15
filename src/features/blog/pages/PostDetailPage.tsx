import { Box, Container, Drawer, Grid } from '@mui/material';
import commentApi from 'api/commentApi';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PageTitle } from 'components/common';
import { commentActions, selectPostComments } from 'features/blog/commentSlice';
import { selectSocket } from 'features/socket/socketSlice';
import { IComment, ILocationState, IPost } from 'models';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostDetail, selectPostLoading } from '../blogSlice';
import PostComment from '../components/PostComment';
import PostDetail from '../components/PostDetail';
import PostReaction from '../components/PostReaction';

export function PostDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const initOpenComment = !!(location.state as ILocationState)?.openComment;

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const post = useAppSelector(selectPostDetail);
  const postComments = useAppSelector(selectPostComments);

  const socket = useAppSelector(selectSocket);

  const [openComment, setOpenComment] = useState<boolean>(initOpenComment);

  useEffect(() => {
    if (!slug) return;
    dispatch(blogActions.fetchPostDetail(slug));
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
  }, [openComment, post]);

  const closeComment = () => setOpenComment(false);

  const handleSavePost = async (post: IPost) => {
    await postApi.save(post._id || '');
  };

  const handleRemovePost = async (post: IPost) => {
    await postApi.remove(post._id || '');
  };

  const handleLikePost = () => {
    dispatch(blogActions.likePost(post?._id || ''));
  };

  const handleCreateComment = async (comment: IComment) => {
    await commentApi.create(comment);
  };

  const handleRemoveComment = async (comment: IComment) => {
    await commentApi.remove(comment._id as string);
  };

  const handleLikeComment = (comment: IComment) => {
    dispatch(commentActions.like(comment._id as string));
  };

  const updateCommentCount = (count: number) => {
    dispatch(blogActions.updateCommentCount(count));
  };

  if (loading) return null;
  if (!loading && !post) return <NotFound />;

  return (
    <Container>
      <PageTitle title={loading ? APP_NAME : `${post?.title} | ${post?.author?.name}`} />

      {!loading && post && (
        <Box>
          <Grid container>
            <Grid item xs={12} md={10} lg={7} mx="auto">
              <Box>
                <PostDetail post={post} onSave={handleSavePost} onRemove={handleRemovePost} />
              </Box>
            </Grid>

            <Grid item xs={12} md={10} lg={3} mx={{ xs: 'auto', lg: 0 }}>
              <Box position="sticky" top={96} mb={3}>
                <PostReaction
                  post={post}
                  onOpenComment={() => setOpenComment(true)}
                  onLikePost={handleLikePost}
                />
              </Box>
            </Grid>
          </Grid>

          <Drawer anchor="right" open={openComment} onClose={closeComment}>
            <PostComment
              commentList={postComments}
              postId={post?._id || ''}
              onClose={closeComment}
              onCreate={handleCreateComment}
              onRemove={handleRemoveComment}
              onLike={handleLikeComment}
              updateCommentCount={updateCommentCount}
            />
          </Drawer>
        </Box>
      )}
    </Container>
  );
}
