import { Container, Drawer, Grid } from '@mui/material';
import commentApi from 'api/commentApi';
import postApi from 'api/postApi';
import { NotFound } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { commentActions, selectPostComments } from 'features/comment/commentSlice';
import { selectSocket } from 'features/socket/socketSlice';
import { Comment, Post } from 'models';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useParams } from 'react-router-dom';
import PostComment from '../components/PostComment';
import PostDetail from '../components/PostDetail';
import PostInteract from '../components/PostInteract';
import { postActions, selectPostDetail, selectPostLoading } from '../postSlice';
import { toast } from 'react-toastify';

export function PostDetailPage() {
  const { slug } = useParams();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const post = useAppSelector(selectPostDetail);
  const currentUser = useAppSelector(selectCurrentUser);
  const postComments = useAppSelector(selectPostComments);

  const socket = useAppSelector(selectSocket);

  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    slug && dispatch(postActions.fetchPostDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { id: post?._id });

    return () => {
      socket.emit('outRoom', { id: post?._id });
    };
  }, [socket, post]);

  const closeComment = () => setShowComment(false);

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
  };

  const handleToggleShowComment = () => {
    setShowComment(!showComment);
  };

  const fetchPostComments = () => {
    dispatch(commentActions.fetchPostComments(post?._id as string));
  };

  const handleCreateComment = async (value: string) => {
    try {
      const comment: Comment = {
        postId: post?._id as string,
        userId: currentUser?._id as string,
        content: value,
      };

      await commentApi.create(comment);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRemoveComment = async (comment: Comment) => {
    await commentApi.remove(comment._id as string);
  };

  const handleLikePost = () => {
    dispatch(postActions.likePost(post?._id as string));
  };

  const handleLikeComment = (comment: Comment) => {
    dispatch(commentActions.likeComment(comment._id as string));
  };

  if (loading) return null;
  if (!post?._id) return <NotFound />;

  return (
    <Container>
      <Grid container spacing={{ xs: 2, lg: 8 }}>
        <Grid item xs={12} md={10} lg={8} mx="auto">
          <PostDetail post={post} onRemovePost={handleRemovePost} />
        </Grid>

        <Grid item xs={12} md={10} lg={4} mx="auto">
          <PostInteract
            post={post}
            currentUser={currentUser}
            openComment={handleToggleShowComment}
            onLikePost={handleLikePost}
          />
        </Grid>
      </Grid>

      <Drawer anchor="right" open={showComment} onClose={handleToggleShowComment}>
        <PostComment
          commentList={postComments}
          fetchComments={fetchPostComments}
          onClose={closeComment}
          onCreate={handleCreateComment}
          onRemove={handleRemoveComment}
          onLikeComment={handleLikeComment}
        />
      </Drawer>
    </Container>
  );
}
