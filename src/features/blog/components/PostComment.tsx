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
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectCommentLoading } from 'features/blog/commentSlice';
import { IComment } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/toast';
import CommentItem from './CommentItem';

export interface IPostCommentProps {
  commentList: IComment[];
  postId: string;
  onClose?: () => void;
  onCreate?: (comment: IComment) => void;
  onRemove?: (comment: IComment) => void;
  onLike?: (comment: IComment) => void;
}

export default function PostComment(props: IPostCommentProps) {
  const { commentList, postId, onClose, onCreate, onRemove, onLike } = props;

  const { t } = useTranslation('postComment');

  const loading = useAppSelector(selectCommentLoading);
  const currentUser = useAppSelector(selectCurrentUser);

  const defaultValues: IComment = {
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

  const handleSubmitComment = async (comment: IComment) => {
    try {
      await onCreate?.(comment);
      setValue('content', '');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
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
          {loading ? (
            <CircularProgress size={20} color="primary" sx={{ mr: 1 }} />
          ) : (
            commentList?.length
          )}
          {t('comment')}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSubmitComment)}>
          <Stack pt={6} pb={3} bgcolor="background.paper">
            <Avatar
              src={currentUser?.avatar}
              sx={{
                width: 36,
                height: 36,
                flexGrow: 0,
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
