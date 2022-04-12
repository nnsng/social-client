import { CloseRounded } from '@mui/icons-material';
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectCommentLoading } from 'features/comment/commentSlice';
import { Comment } from 'models';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useTranslateFiles } from 'utils/translation';
import { blogActions } from '../blogSlice';
import CommentItem from './CommentItem';

export interface PostCommentProps {
  commentList: Comment[];
  postId: string;
  onClose?: () => void;
  onCreate?: (comment: Comment) => void;
  onRemove?: (comment: Comment) => void;
  onLike?: (comment: Comment) => void;
}

export default function PostComment(props: PostCommentProps) {
  const { commentList, postId, onClose, onCreate, onRemove, onLike } = props;

  const { t } = useTranslation('postComment');
  const { toast: toastTranslation } = useTranslateFiles('toast');

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCommentLoading);
  const currentUser = useAppSelector(selectCurrentUser);

  const defaultValues: Comment = {
    postId,
    userId: currentUser?._id as string,
    content: '',
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    return () => {
      dispatch(blogActions.updateCommentCount(commentList.length));
    };
  }, [dispatch, commentList]);

  const handleSubmitComment = async (comment: Comment) => {
    try {
      await onCreate?.(comment);
      setValue('content', '');
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  return (
    <Stack
      direction="column"
      width="100vw"
      height="100vh"
      maxWidth={680}
      px={{ xs: 3, sm: 5 }}
      bgcolor="background.paper"
    >
      <Stack direction="column" position="sticky" top={0} zIndex={2} pt={8}>
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
            cursor: 'default',
          }}
        >
          {loading ? <CircularProgress size={20} color="primary" /> : commentList?.length}
          {t('comment')}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitComment)}>
          <Stack pt={6} pb={3}>
            <Avatar
              src={currentUser?.avatar}
              sx={{
                width: 36,
                height: 36,
                flexShrink: 1,
                mr: 3,
              }}
            />

            <TextField
              variant="standard"
              placeholder={t('placeholder')}
              fullWidth
              autoFocus
              disabled={loading || isSubmitting}
              {...register('content')}
            />
          </Stack>
        </form>
      </Stack>

      <List>
        {commentList?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} onRemove={onRemove} onLike={onLike} />
        ))}
      </List>
    </Stack>
  );
}
