import { User } from './user';

export interface Message {
  sentId: string;
  text: string;
  createdAt: string;
}

export interface Chat {
  user: Partial<User>;
  messageList: Message[];
  new?: boolean;
}

export interface MessageResponse {
  user: Partial<User>;
  message: Message;
}
