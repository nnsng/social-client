import { Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { TimeTooltip } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IMessage } from 'models';

export interface IChatMessageProps {
  message: IMessage;
}

export default function ChatMessage({ message }: IChatMessageProps) {
  const { _id: currentUserId } = useAppSelector(selectCurrentUser) || {};
  const isMe = message.sentId === currentUserId;

  return (
    <TimeTooltip
      timestamp={message.createdAt}
      format="HH:mm"
      placement={isMe ? 'left' : 'right'}
      arrow
    >
      <Stack
        sx={{
          position: 'relative',
          maxWidth: '75%',
          width: 'fit-content',
          mb: 0.5,
          px: 1,
          py: 0.5,
          ml: isMe ? 'auto' : 0,
          '&:first-of-type': {
            mt: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            zIndex: 0,
            inset: 0,
            bgcolor: isMe ? 'primary.main' : 'action.selected',
            opacity: isMe ? 0.5 : 1,
            borderRadius: 2,
          },
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
    </TimeTooltip>
  );
}
