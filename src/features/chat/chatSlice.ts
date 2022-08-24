import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Chat, MessageResponse, User } from 'models';

export interface ChatState {
  list: Chat[];
  current: Chat | null;
  isExpandChat: boolean;
}

const initialState: ChatState = {
  list: [],
  current: null,
  isExpandChat: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageResponse>) {
      const { user, message } = action.payload;

      const index = state.list.findIndex((c) => c.user._id === user._id);
      let chat: Chat = {
        user: {},
        messageList: [],
        new: true,
      };

      if (index > -1) {
        chat = state.list.splice(index, 1)[0];
        chat.messageList = [...chat.messageList, message];
      } else {
        chat = { user, messageList: [message] };
      }
      state.list = [chat, ...state.list];
      state.current = chat;
    },
    startChat(state, action: PayloadAction<Partial<User>>) {
      const { _id, name, avatar, username } = action.payload;
      const user = { _id, name, avatar, username };

      const index = state.list.findIndex((c) => c.user._id === user._id);

      const newChat: Chat = {
        user,
        messageList: [],
      };

      const chat = index > -1 ? state.list[index] : newChat;

      state.current = chat;
      state.isExpandChat = true;
    },
    setCurrentChat(state, action: PayloadAction<Chat | null>) {
      state.current = action.payload;
    },
    setIsExpandChat(state, action: PayloadAction<boolean>) {
      state.isExpandChat = action.payload;
    },
    removeEmptyChat(state) {
      state.list = state.list.filter((chat) => chat.messageList.length > 0);
    },
    reset(state) {
      state = initialState;
    },
  },
});

export const chatActions = chatSlice.actions;

export const selectChatList = (state: RootState) => state.chat.list;
export const selectCurrentChat = (state: RootState) => state.chat.current;
export const selectIsExpandChat = (state: RootState) => state.chat.isExpandChat;

const chatReducer = chatSlice.reducer;
export default chatReducer;
