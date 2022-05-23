import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export interface IChatMessageProps {
  message: string;
  isMe: boolean;
}

export default function ChatMessage({ message, isMe }: IChatMessageProps) {
  return (
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
        overflow: 'hidden',
        '&:first-of-type': {
          mt: 1,
        },
        ...(isMe
          ? {
              '&::after': {
                position: 'absolute',
                content: '""',
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
          flexWrap: 'wrap',
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
}
