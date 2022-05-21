import { Avatar, Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { PopperPopup } from 'components/common/PopperPopup';
import React, { useEffect } from 'react';
import { formatTime, truncateText, getCurrentUserId } from 'utils/common';
import { chatActions, IConversation } from '../chatSlice';

export interface IChatPopupProps {
  open: boolean;
  anchorEl?: any;
  conversations: IConversation[];
  onClose?: () => void;
  onChatClick?: (conversation: IConversation) => void;
}

export default function ChatPopup(props: IChatPopupProps) {
  const { open, anchorEl, conversations, onClose, onChatClick } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatActions.clearEmptyConversation());
  }, []);

  return (
    <PopperPopup
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      placement="top-end"
      sx={{
        width: 350,
        mb: 2,
      }}
    >
      <Typography color="text.primary" fontSize={20} fontWeight={500} py={1} px={2}>
        Chat
      </Typography>

      <Divider />

      <Stack
        direction="column"
        className="default-scrollbar"
        sx={{
          p: 0.8,
          maxHeight: 400,
          overflow: 'auto',
        }}
      >
        {conversations.map((conversation, idx) => {
          const lastMessage = conversation.messageList.slice(-1)[0] || {};

          return (
            <MenuItem
              key={idx}
              sx={{
                display: 'flex',
                px: 1,
                py: 1.2,
                borderRadius: 1,
                bgcolor: false ? 'action.hover' : 'transparent',
              }}
              onClick={() => onChatClick?.(conversation)}
            >
              <Avatar src={conversation.user?.avatar} sx={{ flexShrink: 0 }} />

              <Box flexGrow={1} ml={2}>
                <Typography fontSize={15} fontWeight={500}>
                  {truncateText(conversation.user?.name || '', 25)}
                </Typography>

                <Stack>
                  <Typography color="text.secondary" fontSize={12} fontWeight={400}>
                    {lastMessage?.sentUserId === getCurrentUserId() && 'You: '}
                    {truncateText(lastMessage.text || '', 20)}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize={12}
                    fontWeight={400}
                    sx={{
                      '&::before': {
                        content: '"•"',
                        mx: 0.5,
                      },
                    }}
                  >
                    {formatTime(Date.now())}
                  </Typography>
                </Stack>
              </Box>
            </MenuItem>
          );
        })}
      </Stack>
    </PopperPopup>
  );
}
