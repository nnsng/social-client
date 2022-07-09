import { CloseRounded } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { otherApi } from 'api';
import { ContainedInput } from 'components/common';
import { useSubmitWithEnter } from 'hooks';
import { IChat } from 'models';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import ChatMessage from './ChatMessage';

export interface ICurrentChatProps {
  chat: IChat;
  show: boolean;
  onClose?: () => void;
  toggleShow?: () => void;
}

export default function CurrentChat(props: ICurrentChatProps) {
  const { chat, show, onClose, toggleShow } = props;

  const endMessageRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    endMessageRef.current?.scrollIntoView();
    inputRef.current?.focus();
  }, [show, chat]);

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim().length === 0) return;

    setMessage('');

    try {
      const newMessage = {
        userId: chat.user?._id ?? '',
        text: message.trim(),
      };

      await otherApi.chat(newMessage);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const onKeyUp = useSubmitWithEnter(handleSendMessage);

  return (
    <Box
      width={320}
      sx={{
        ...themeMixins.paperBorder(),
        borderBottom: 0,
        borderRadius: 0,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        overflow: 'hidden',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 1,
          bgcolor: 'primary.main',
          cursor: 'pointer',
        }}
        onClick={toggleShow}
      >
        <Stack alignItems="center" spacing={1} py={1}>
          <Avatar
            src={chat.user?.avatar}
            sx={{ width: 32, height: 32 }}
            component={Link}
            to={`/user/${chat.user?.username}`}
          />

          <Typography variant="subtitle2" color="common.white" fontSize={14}>
            {chat.user?.name}
          </Typography>
        </Stack>

        <IconButton onClick={onClose} sx={{ color: 'common.white' }}>
          <CloseRounded />
        </IconButton>
      </Stack>

      {show && (
        <Stack direction="column" height={400} bgcolor="background.paper">
          <Box
            className="default-scrollbar"
            sx={{
              flexGrow: 1,
              px: 1,
              overflow: 'auto',
            }}
          >
            {chat.messageList.map((message, idx) => (
              <ChatMessage key={idx} message={message} />
            ))}
            <Box ref={endMessageRef}></Box>
          </Box>

          <Box
            sx={{
              ...themeMixins.paperBorder('top'),
              p: 1.5,
              borderRadius: 0,
            }}
          >
            <ContainedInput
              size="small"
              inputRef={inputRef}
              placeholder="Aa"
              fullWidth
              value={message}
              onSubmit={handleSendMessage}
              sx={{
                '& input': {
                  fontSize: 14,
                  py: 0.8,
                },
              }}
              onChange={handleMessageChange}
              onKeyUp={onKeyUp}
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
}
