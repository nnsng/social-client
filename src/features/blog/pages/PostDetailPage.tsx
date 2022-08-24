import { Box, Container, Drawer, Grid } from '@mui/material';
import { postApi, commentApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PageTitle } from 'components/common';
import { PostDetailSkeleton } from 'components/skeletons';
import { commentActions, selectPostComments } from 'features/blog/commentSlice';
import { selectSocket } from 'features/socket/socketSlice';
import { CommentActionType, Comment, LocationState, Post, PostActionType } from 'models';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostDetail, selectPostLoading } from '../blogSlice';
import PostComment from '../components/PostComment';
import PostDetail from '../components/PostDetail';
import PostReaction from '../components/PostReaction';

export function PostDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const initOpenComment = !!(location.state as LocationState)?.openComment;

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
  }, [openComment]);

  const closeComment = () => setOpenComment(false);

  const handlePostAction = async (action: PostActionType, post: Post) => {
    await postApi[action](post._id || '');
  };

  const handleLikePost = () => {
    dispatch(blogActions.likePost(post?._id || ''));
  };

  const handleCommentAction = async (action: CommentActionType, comment: Comment) => {
    if (action === 'like') {
      dispatch(commentActions.like(comment._id || ''));
      return;
    }
    await commentApi[action](comment);
  };

  const updateCommentCount = (count: number) => {
    dispatch(blogActions.updateCommentCount(count));
  };

  return (
    <Container>
      <PageTitle title={loading ? APP_NAME : `${post?.title} | ${post?.author?.name}`} />

      <Box>
        <Grid container>
          <Grid item xs={12} md={10} lg={8} mx="auto">
            <Box>
              {loading ? (
                <PostDetailSkeleton />
              ) : post ? (
                <PostDetail post={post} onPostAction={handlePostAction} />
              ) : (
                <NotFound />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={10} lg={3} mx={{ xs: 'auto', lg: 0 }}>
            <Box position="sticky" top={96} mb={3}>
              {!loading && post && (
                <PostReaction
                  post={post}
                  onOpenComment={() => setOpenComment(true)}
                  onLikePost={handleLikePost}
                />
              )}
            </Box>
          </Grid>
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
      </Box>
    </Container>
  );
}
