import { IUser } from './auth';

export interface IMessage {
  sentId: string;
  text: string;
  createdAt: string;
}

export interface IChat {
  user: Partial<IUser>;
  messageList: IMessage[];
  new?: boolean;
}

export interface IMessageResponse {
  user: Partial<IUser>;
  message: IMessage;
}
