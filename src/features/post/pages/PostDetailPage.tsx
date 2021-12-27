import { Container, Drawer, Grid } from '@mui/material';
import commentApi from 'api/commentApi';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { commentActions, selectPostComments } from 'features/comment/commentSlice';
import { selectSocket } from 'features/socket/socketSlice';
import { Comment, Post } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostComment from '../components/PostComment';
import PostDetail from '../components/PostDetail';
import PostInteract from '../components/PostInteract';
import { postActions, selectPostDetail, selectPostLoading } from '../postSlice';

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

    dispatch(postActions.fetchPostDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    document.title = post?.title ?? 'Blog App';
  }, [post]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { id: post?._id });

    return () => {
      socket.emit('outRoom', { id: post?._id });
    };
  }, [socket, post]);

  useEffect(() => {
    showComment && dispatch(commentActions.fetchPostComments(post?._id as string));
  }, [showComment]);

  const openComment = () => setShowComment(!showComment);
  const closeComment = () => setShowComment(false);

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
  };

  const handleLikePost = () => {
    dispatch(postActions.likePost(post?._id as string));
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

  if (loading) return null;
  if (!post?._id) return <NotFound />;

  return (
    <Container>
      <Grid container spacing={{ xs: 2, lg: 8 }}>
        <Grid item xs={12} md={10} lg={8} mx="auto">
          <PostDetail post={post} onSave={handleSavePost} onRemove={handleRemovePost} />
        </Grid>

        <Grid item xs={12} md={10} lg={4} mx="auto">
          <PostInteract post={post} openComment={openComment} onLikePost={handleLikePost} />
        </Grid>
      </Grid>

      <Drawer anchor="right" open={showComment} onClose={closeComment}>
        <PostComment
          commentList={postComments}
          postId={post?._id}
          onClose={closeComment}
          onCreate={handleCreateComment}
          onRemove={handleRemoveComment}
          onLike={handleLikeComment}
        />
      </Drawer>
    </Container>
  );
}
