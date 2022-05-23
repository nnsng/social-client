import { ChatRounded } from '@mui/icons-material';
import { IconButton, Stack, Theme, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IChat } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import { chatActions, selectChatList, selectCurrentChat, selectShowCurrentChat } from './chatSlice';
import ChatPopup from './components/ChatPopup';
import CurrentChat from './components/CurrentChat';

export default function Chat() {
  const dispatch = useAppDispatch();
  const chatList = useAppSelector(selectChatList);
  const currentChat = useAppSelector(selectCurrentChat);
  const isShowChat = useAppSelector(selectShowCurrentChat);

  const ref = useRef<any>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  useEffect(() => {
    openPopup && dispatch(chatActions.setCurrentChat(null));
  }, [openPopup]);

  const toggleOpenPopup = () => setOpenPopup(!openPopup);
  const closePopup = () => setOpenPopup(false);

  const toggleShowCurrentChat = () => {
    dispatch(chatActions.setShowCurrentChat(!isShowChat));
  };

  const handleChatClick = (chat: IChat) => {
    closePopup();
    dispatch(chatActions.setShowCurrentChat(true));
    dispatch(chatActions.setCurrentChat(chat));
  };

  const handleCloseCurrentConversation = () => {
    dispatch(chatActions.setCurrentChat(null));
  };

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  if (!lgUp) return null;

  return (
    <Stack
      direction="row-reverse"
      alignItems="flex-end"
      spacing={2}
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 20,
      }}
    >
      <IconButton
        ref={ref}
        sx={{
          width: 52,
          height: 52,
          mb: 2,
          bgcolor: 'action.selected',
          color: 'text.primary',
        }}
        onClick={toggleOpenPopup}
      >
        <ChatRounded fontSize="medium" />
      </IconButton>

      <ChatPopup
        open={openPopup}
        anchorEl={ref.current}
        chatList={chatList}
        onClose={closePopup}
        onChatClick={handleChatClick}
      />

      {!!currentChat && (
        <CurrentChat
          chat={currentChat}
          show={isShowChat}
          onClose={handleCloseCurrentConversation}
          toggleShow={toggleShowCurrentChat}
        />
      )}
    </Stack>
  );
}
