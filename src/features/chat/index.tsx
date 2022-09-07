import { IconButton, Stack, Theme, useMediaQuery } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ChatIcon } from 'components/icons';
import { Chat } from 'models';
import { useRef, useState } from 'react';
import { chatActions, selectChatList, selectCurrentChat, selectIsExpandChat } from './chatSlice';
import ChatPopup from './components/ChatPopup';
import CurrentChat from './components/CurrentChat';

export default function ChatFeature() {
  const dispatch = useAppDispatch();
  const chatList = useAppSelector(selectChatList);
  const currentChat = useAppSelector(selectCurrentChat);
  const isExpandChat = useAppSelector(selectIsExpandChat);

  const ref = useRef<any>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const toggleOpenPopup = () => setOpenPopup(!openPopup);
  const closePopup = () => setOpenPopup(false);

  const toggleShowCurrentChat = () => {
    dispatch(chatActions.setIsExpandChat(!isExpandChat));
  };

  const handleOpenCurrentChat = (chat: Chat) => {
    closePopup();
    dispatch(chatActions.setIsExpandChat(true));
    dispatch(chatActions.setCurrentChat(chat));
  };

  const handleCloseCurrentChat = () => {
    dispatch(chatActions.setCurrentChat(null));
  };

  const mdUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));
  if (!mdUp) return null;

  return (
    <Stack
      direction="row-reverse"
      spacing={2}
      sx={{
        alignItems: 'flex-end',
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
    >
      <IconButton
        ref={ref}
        onClick={toggleOpenPopup}
        sx={{
          width: 52,
          height: 52,
          mb: 3,
          mr: 3,
          bgcolor: 'action.selected',
        }}
      >
        <ChatIcon />
      </IconButton>

      <ChatPopup
        open={openPopup}
        anchorEl={ref.current}
        chatList={chatList}
        onClose={closePopup}
        onChatClick={handleOpenCurrentChat}
      />

      {!!currentChat && (
        <CurrentChat
          chat={currentChat}
          expand={isExpandChat}
          onClose={handleCloseCurrentChat}
          toggleShow={toggleShowCurrentChat}
        />
      )}
    </Stack>
  );
}
