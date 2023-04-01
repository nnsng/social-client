export type NotificationType = 'follow' | 'like' | 'comment';

interface ActionUser {
  _id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface Notification {
  type: NotificationType;
  actionUsers: ActionUser[];
  postSlug: string;
  updatedAt: string;
}
