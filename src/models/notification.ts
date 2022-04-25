import { IUser } from './auth';

export interface INotification {
  _id: string;
  notiTo: string;
  user: Partial<IUser>;
  read: boolean;
  linkTo?: string;
  type: 'welcome' | 'like' | 'comment';
  createdAt: string;
}
