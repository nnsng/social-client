import { getCurrentUserId } from './../../utils/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models';
import { RootState } from 'app/store';

export interface IMessage {
  group: Partial<IUser>[];
  sentUserId: string;
  text: string;
  createdAt?: string;
}

export interface IConversation {
  user: Partial<IUser>;
  messageList: IMessage[];
}

export interface IChatState {
  conversations: IConversation[];
  current: IConversation | null;
  showCurrent: boolean;
}

const initialState: IChatState = {
  conversations: [],
  current: null,
  showCurrent: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      const message = action.payload;
      const currentUserId = getCurrentUserId();

      const user = message.group.find((u) => u._id !== currentUserId);
      const conversation = state.conversations.find((c) => c.user._id === user?._id);
      if (!conversation) {
        const newConversation: IConversation = {
          user: user as Partial<IUser>,
          messageList: [message],
        };
        state.conversations = [newConversation, ...state.conversations];
        state.current = newConversation;
      } else {
        conversation.messageList = [...conversation.messageList, message];
        const existedConversation = state.conversations.find((c) => c.user._id === user?._id);
        if (existedConversation) {
          state.conversations = [
            existedConversation,
            ...state.conversations.filter((c) => c.user._id !== user?._id),
          ];
          state.current = existedConversation;
        }
      }
    },
    setCurrentConversation(state, action: PayloadAction<IConversation | null>) {
      state.current = action.payload;
    },
    startChat(state, action: PayloadAction<Partial<IUser>>) {
      const user = action.payload;
      const conversation = state.conversations.find(
        (conversation) => conversation.user._id === user._id
      );
      if (conversation) {
        state.current = conversation;
      } else {
        const newConversation: IConversation = {
          user: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            username: user.username,
          },
          messageList: [],
        };
        state.conversations = [newConversation, ...state.conversations];
        state.current = newConversation;
        state.showCurrent = true;
      }
    },
    setShowCurrentConversation(state, action: PayloadAction<boolean>) {
      state.showCurrent = action.payload;
    },
    clearEmptyConversation(state) {
      state.conversations = state.conversations.filter(
        (conversation) => conversation.messageList.length > 0
      );
    },
  },
});

export const chatActions = chatSlice.actions;

export const selectConversationList = (state: RootState) => state.chat.conversations;
export const selectCurrentConversation = (state: RootState) => state.chat.current;
export const selectShowCurrentConversation = (state: RootState) => state.chat.showCurrent;

const chatReducer = chatSlice.reducer;
export default chatReducer;
