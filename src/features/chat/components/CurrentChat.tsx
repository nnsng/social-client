import { CloseRounded, SendRounded } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import otherApi from 'api/otherApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ContainedInput } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUserId } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { getErrorMessage } from 'utils/toast';
import { chatActions, IConversation, IMessage } from '../chatSlice';
import ChatMessage from './ChatMessage';

export interface ICurrentChatProps {
  conversation: IConversation;
  show: boolean;
  onClose?: () => void;
  toggleShow?: () => void;
}

export default function CurrentChat(props: ICurrentChatProps) {
  const { conversation, show, onClose, toggleShow } = props;

  const currentUser = useAppSelector(selectCurrentUser);

  const endMessageRef = useRef<any>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({});
  }, [show, conversation]);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim().length === 0) return;

    try {
      const newMessage = {
        group: [currentUser?._id ?? '', conversation.user?._id ?? ''],
        text: message.trim(),
      };

      await otherApi.chat(newMessage);

      setMessage('');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Box
      width={320}
      sx={{
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        overflow: 'hidden',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: 48,
          px: 1,
          bgcolor: 'primary.main',
          cursor: 'pointer',
        }}
        onClick={toggleShow}
      >
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={conversation.user?.avatar}
            sx={{ width: 32, height: 32 }}
            component={Link}
            to={`/user/${conversation.user?.username}`}
          />

          <Typography variant="subtitle2" color="common.white" fontSize={16}>
            {conversation.user?.name}
          </Typography>
        </Stack>

        <IconButton onClick={onClose} sx={{ color: 'common.white' }}>
          <CloseRounded />
        </IconButton>
      </Stack>

      {show && (
        <Stack
          direction="column"
          height={400}
          bgcolor="background.paper"
          sx={{
            ...themeMixins.paperBorder(),
            borderTop: 0,
            borderRadius: 0,
          }}
        >
          <Stack
            direction="column"
            className="default-scrollbar"
            sx={{
              flexGrow: 1,
              px: 1,
              overflow: 'auto',
            }}
          >
            {conversation.messageList.map((message, idx) => (
              <ChatMessage
                key={idx}
                message={message.text}
                isMe={message.sentUserId === getCurrentUserId()}
              />
            ))}
            <Box ref={endMessageRef}></Box>
          </Stack>

          <Box
            sx={{
              ...themeMixins.paperBorder('top'),
              p: 1.5,
              borderRadius: 0,
            }}
          >
            <ContainedInput
              size="small"
              placeholder="Aa"
              fullWidth
              value={message}
              endAdornment={
                <SendRounded
                  color="primary"
                  sx={{ ml: 1, cursor: 'pointer' }}
                  onClick={handleSendMessage}
                />
              }
              sx={{
                '& input': {
                  py: 0.8,
                },
              }}
              onChange={handleMessageChange}
              onKeyUp={handleKeyUp}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
}
