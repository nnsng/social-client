import { Box, Drawer, Grid } from '@mui/material';
import commentApi from 'api/commentApi';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PageTitle } from 'components/common';
import { commentActions, selectPostComments } from 'features/blog/commentSlice';
import { selectSocket } from 'features/socket/socketSlice';
import { Comment, Post } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostDetail, selectPostLoading } from '../blogSlice';
import PostComment from '../components/PostComment';
import PostDetail from '../components/PostDetail';
import PostReact from '../components/PostReact';

export function PostDetailPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const post = useAppSelector(selectPostDetail);
  const postComments = useAppSelector(selectPostComments);

  const socket = useAppSelector(selectSocket);

  const [showComment, setShowComment] = useState(false);

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
    if (showComment) {
      dispatch(commentActions.fetchPostComments(post?._id as string));
    } else {
      dispatch(blogActions.updateCommentCount(postComments.length));
    }
  }, [showComment]);

  const openComment = () => setShowComment(true);
  const closeComment = () => setShowComment(false);

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
  };

  const handleLikePost = () => {
    dispatch(blogActions.likePost(post?._id as string));
  };

  const handleCreateComment = async (comment: Comment) => {
    await commentApi.create(comment);
  };

  const handleRemoveComment = async (comment: Comment) => {
    await commentApi.remove(comment._id as string);
  };

  const handleLikeComment = (comment: Comment) => {
    dispatch(commentActions.likeComment(comment._id as string));
  };

  if (!loading && !post) return <NotFound />;

  return (
    <>
      <PageTitle title={loading ? APP_NAME : `${post?.title} | ${post?.author?.name}`} />

      {!loading && post && (
        <Box>
          <Grid container spacing={{ xs: 2, lg: 8 }}>
            <Grid item xs={12} md={10} lg mx="auto">
              <Box>
                <PostDetail post={post} onSave={handleSavePost} onRemove={handleRemovePost} />
              </Box>
            </Grid>

            <Grid item xs={12} md={10} lg={4} mx="auto">
              <Box position="sticky" top={96}>
                <PostReact post={post} onOpenComment={openComment} onLikePost={handleLikePost} />
              </Box>
            </Grid>
          </Grid>

          <Drawer anchor="right" open={showComment} onClose={closeComment}>
            <PostComment
              commentList={postComments}
              postId={post?._id || ''}
              onClose={closeComment}
              onCreate={handleCreateComment}
              onRemove={handleRemoveComment}
              onLike={handleLikeComment}
            />
          </Drawer>
        </Box>
      )}
    </>
  );
}
