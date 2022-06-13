import { CloseRounded, SendRounded } from '@mui/icons-material';
import { Avatar, CircularProgress, IconButton, List, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ContainedInput } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectCommentLoading } from 'features/blog/commentSlice';
import { CommentActionType, IComment } from 'models';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/toast';
import CommentItem from './CommentItem';

export interface IPostCommentProps {
  commentList: IComment[];
  postId: string;
  onClose?: () => void;
  updateCommentCount?: (count: number) => void;
  onCommentAction?: (action: CommentActionType, comment: IComment) => void;
}

export default function PostComment(props: IPostCommentProps) {
  const { commentList, postId, onClose, updateCommentCount, onCommentAction } = props;

  const { t } = useTranslation('postComment');

  const loading = useAppSelector(selectCommentLoading);
  const currentUser = useAppSelector(selectCurrentUser);

  const [input, setInput] = useState<string>('');

  useEffect(() => {
    updateCommentCount?.(commentList.length);
  }, [commentList.length]);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmitComment();
    }
  };

  const handleSubmitComment = async () => {
    setInput('');

    try {
      const comment: IComment = {
        postId,
        userId: currentUser?._id || '',
        content: input.trim(),
      };

      await onCommentAction?.('create', comment);
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
          fontSize={18}
          fontWeight={600}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'default',
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="primary" sx={{ mr: 1 }} />
          ) : (
            commentList.length || 0
          )}
          {t(`comment${commentList.length > 1 ? 's' : ''}`)}
        </Typography>

        <Stack alignItems="center" pt={6} pb={3} bgcolor="background.paper">
          <Avatar
            src={currentUser?.avatar}
            sx={{
              width: 36,
              height: 36,
              flexGrow: 0,
              mr: 2,
            }}
          />

          <ContainedInput
            size="small"
            placeholder={t('placeholder')}
            fullWidth
            autoFocus
            disabled={loading}
            value={input}
            endAdornment={
              <SendRounded
                color="primary"
                onClick={handleSubmitComment}
                sx={{ ml: 1, cursor: 'pointer' }}
              />
            }
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
        </Stack>
      </Stack>

      <List>
        {commentList?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} onCommentAction={onCommentAction} />
        ))}
      </List>
    </Stack>
  );
}
