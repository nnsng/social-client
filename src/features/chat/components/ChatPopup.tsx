import { Avatar, Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { PopperPopup } from 'components/common/PopperPopup';
import { IChat } from 'models';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime, getCurrentUserId, truncateText } from 'utils/common';
import { chatActions } from '../chatSlice';

export interface IChatPopupProps {
  open: boolean;
  anchorEl?: any;
  chatList: IChat[];
  onClose?: () => void;
  onChatClick?: (chat: IChat) => void;
}

export default function ChatPopup(props: IChatPopupProps) {
  const { open, anchorEl, chatList, onClose, onChatClick } = props;

  const { t } = useTranslation('chatPopup');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatActions.removeEmptyChat());
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
        {chatList.length > 0 ? (
          chatList.map((chat, idx) => {
            const lastMessage = chat.messageList.slice(-1)[0] || {};
            return (
              <MenuItem
                key={idx}
                sx={{
                  display: 'flex',
                  px: 1,
                  py: 1.2,
                  borderRadius: 1,
                  bgcolor: !!chat.new ? 'action.hover' : 'transparent',
                }}
                onClick={() => onChatClick?.(chat)}
              >
                <Avatar src={chat.user?.avatar} sx={{ flexShrink: 0 }} />

                <Box flexGrow={1} ml={2}>
                  <Typography fontSize={15} fontWeight={500}>
                    {truncateText(chat.user?.name || '', 25)}
                  </Typography>

                  <Stack>
                    <Typography color="text.secondary" fontSize={12} fontWeight={400}>
                      {lastMessage?.sentId === getCurrentUserId() && 'You: '}
                      {truncateText(lastMessage.text || '', 16)}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      fontSize={12}
                      fontWeight={400}
                      sx={{
                        '&::before': {
                          content: '"•"',
                          mx: 1,
                        },
                      }}
                    >
                      {formatTime(Date.now())}
                    </Typography>
                  </Stack>
                </Box>
              </MenuItem>
            );
          })
        ) : (
          <Typography variant="caption" color="text.secondary" mx="auto">
            {t('empty')}
          </Typography>
        )}
      </Stack>
    </PopperPopup>
  );
}
