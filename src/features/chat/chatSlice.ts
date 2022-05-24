import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IChat, IMessageResponse, IUser } from 'models';

export interface IChatState {
  chatList: IChat[];
  current: IChat | null;
  showCurrent: boolean;
}

const initialState: IChatState = {
  chatList: [],
  current: null,
  showCurrent: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessageResponse>) {
      const { user, message } = action.payload;

      const index = state.chatList.findIndex((c) => c.user._id === user._id);
      let chat: IChat = {
        user: {},
        messageList: [],
        new: true,
      };

      if (index > -1) {
        chat = state.chatList.splice(index, 1)[0];
        chat.messageList = [...chat.messageList, message];
      } else {
        chat = { user, messageList: [message] };
      }
      state.chatList = [chat, ...state.chatList];

      state.current = chat;
    },
    startChat(state, action: PayloadAction<Partial<IUser>>) {
      const { _id, name, avatar, username } = action.payload;
      const user = { _id, name, avatar, username };

      const newChat: IChat = {
        user,
        messageList: [],
      };
      state.chatList = [newChat, ...state.chatList];
      state.current = newChat;
      state.showCurrent = true;
    },
    setCurrentChat(state, action: PayloadAction<IChat | null>) {
      state.current = action.payload;
    },
    setShowCurrentChat(state, action: PayloadAction<boolean>) {
      state.showCurrent = action.payload;
    },
    removeEmptyChat(state) {
      state.chatList = state.chatList.filter((chat) => chat.messageList.length > 0);
    },
    reset(state) {
      state = initialState;
    },
  },
});

export const chatActions = chatSlice.actions;

export const selectChatList = (state: RootState) => state.chat.chatList;
export const selectCurrentChat = (state: RootState) => state.chat.current;
export const selectShowCurrentChat = (state: RootState) => state.chat.showCurrent;

const chatReducer = chatSlice.reducer;
export default chatReducer;
