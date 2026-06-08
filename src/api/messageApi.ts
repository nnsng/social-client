import { Conversation, Message } from '@/models';
import axiosClient from './axiosClient';

export const messageApi = {
  getConversations(): Promise<Conversation[]> {
    const url = '/messages/conversations';
    return axiosClient.get(url);
  },
  getMessages(conversationId: string): Promise<Message[]> {
    const url = `/messages/conversation/${conversationId}`;
    return axiosClient.get(url);
  },
  getOrCreateConversation(
    userId: string
  ): Promise<{ conversation: Conversation; messages: Message[] }> {
    const url = `/messages/user/${userId}`;
    return axiosClient.get(url);
  },
  sendMessage(data: { receiverId: string; text: string }): Promise<Message> {
    const url = '/messages';
    return axiosClient.post(url, data);
  },
  deleteConversation(conversationId: string): Promise<void> {
    const url = `/messages/conversation/${conversationId}`;
    return axiosClient.delete(url);
  },
};
