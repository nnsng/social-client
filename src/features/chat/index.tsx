import { ChatRounded } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useRef, useState } from 'react';
import {
  chatActions,
  IConversation,
  selectConversationList,
  selectCurrentConversation,
  selectShowCurrentConversation,
} from './chatSlice';
import ChatPopup from './components/ChatPopup';
import CurrentChat from './components/CurrentChat';

export interface IChatProps {}

export default function Chat(props: IChatProps) {
  const dispatch = useAppDispatch();
  const conversationList = useAppSelector(selectConversationList);
  const currentConversation = useAppSelector(selectCurrentConversation);
  const isShowConversation = useAppSelector(selectShowCurrentConversation);

  const ref = useRef<any>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const toggleOpenPopup = () => setOpenPopup(!openPopup);
  const closePopup = () => setOpenPopup(false);

  const toggleShowConversation = () => {
    dispatch(chatActions.setShowCurrentConversation(!isShowConversation));
  };

  const handleChatClick = (conversation: IConversation) => {
    closePopup();
    dispatch(chatActions.setShowCurrentConversation(true));
    dispatch(chatActions.setCurrentConversation(conversation));
  };

  const handleCloseCurrentConversation = () => {
    dispatch(chatActions.setCurrentConversation(null));
  };

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
        conversations={conversationList}
        onClose={closePopup}
        onChatClick={handleChatClick}
      />

      {!!currentConversation && (
        <CurrentChat
          conversation={currentConversation}
          show={isShowConversation}
          onClose={handleCloseCurrentConversation}
          toggleShow={toggleShowConversation}
        />
      )}
    </Stack>
  );
}
