import { CloseRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectCommentLoading } from 'features/comment/commentSlice';
import { Comment } from 'models';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toast } from 'react-toastify';
import CommentItem from './CommentItem';
import { postActions } from '../postSlice';

export interface PostCommentProps {
  commentList: Comment[];
  fetchComments?: () => void;
  onClose?: () => void;
  onCreate?: (content: string) => void;
  onRemove?: (comment: Comment) => void;
  onLikeComment?: (comment: Comment) => void;
}

export default function PostComment(props: PostCommentProps) {
  const { commentList, fetchComments, onClose, onCreate, onRemove, onLikeComment } = props;

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectCommentLoading);

  const [commentInput, setCommentInput] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchComments?.();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(postActions.updateCommentCount(commentList.length));
    };
  }, [dispatch, commentList]);

  const handleSubmitComment = (e: any) => {
    e.preventDefault();
    if (!commentInput) return;

    setSubmitting((state) => true);

    onCreate?.(commentInput);
    setCommentInput('');

    setSubmitting((state) => false);
  };

  return (
    <Stack width="100vw" maxWidth={680} px={{ xs: 3, sm: 5 }}>
      <Stack position="sticky" top={0} zIndex={2} pt={8} bgcolor="background.default">
        <IconButton
          edge="start"
          color="inherit"
          sx={{
            position: 'absolute',
            top: 20,
            right: -20,
          }}
          onClick={onClose}
        >
          <CloseRounded />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            userSelect: 'none',
            cursor: 'default',
          }}
        >
          {loading ? <CircularProgress size={20} color="primary" /> : commentList?.length}
          &nbsp;bình luận
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmitComment}>
          <Box pt={6} pb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar src={currentUser?.avatar} sx={{ width: 36, height: 36 }} />
              </Grid>

              <Grid item xs>
                <TextField
                  variant="standard"
                  placeholder="Viết bình luận..."
                  fullWidth
                  autoFocus
                  spellCheck={false}
                  value={commentInput}
                  disabled={loading || submitting}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Stack>

      <List>
        {commentList?.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onRemove={onRemove}
            onLikeComment={onLikeComment}
          />
        ))}
      </List>
    </Stack>
  );
}
