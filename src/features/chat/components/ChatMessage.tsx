import { Stack, Tooltip, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IMessage } from 'models';
import React from 'react';
import { formatTime } from 'utils/common';

export interface IChatMessageProps {
  message: IMessage;
}

export default function ChatMessage({ message }: IChatMessageProps) {
  const { _id: currentUserId } = useAppSelector(selectCurrentUser) || {};
  const isMe = message.sentId === currentUserId;

  return (
    <Tooltip
      title={formatTime(message.createdAt, 'HH:mm')}
      placement={isMe ? 'left' : 'right'}
      arrow
    >
      <Stack
        sx={{
          position: 'relative',
          maxWidth: '75%',
          width: 'fit-content',
          mb: 1,
          px: 1,
          py: 0.5,
          ml: isMe ? 'auto' : 0,
          borderRadius: 2,
          bgcolor: isMe ? 'transparent' : 'action.selected',
          '&:first-of-type': {
            mt: 1,
          },
          ...(isMe
            ? {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  zIndex: 0,
                  inset: 0,
                  bgcolor: 'primary.main',
                  opacity: 0.5,
                  borderRadius: 2,
                },
              }
            : {}),
        }}
      >
        <Typography
          component="div"
          color="text.primary"
          fontSize={14}
          sx={{
            position: 'relative',
            zIndex: 1,
            wordBreak: 'break-word',
          }}
        >
          {message.text}
        </Typography>
      </Stack>
    </Tooltip>
  );
}
