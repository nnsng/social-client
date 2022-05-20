export interface IPaginationParams {
  page: number;
  limit: number;
  totalRows: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}

export type PostByType = 'all' | 'following';
export interface IListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string | undefined;
  hashtag?: string | undefined;
  username?: string;
  by?: PostByType;
}

export interface IMenuItem {
  label?: string;
  icon?: any;
  onClick?: () => void;
  show?: boolean;
}

export interface ILocationState {
  hideHeaderMenu?: boolean;
  openComment?: boolean;
}

export type NotiType = 'like' | 'comment' | 'follow' | 'report';
export interface INotification {
  _id: string;
  type: NotiType;
  post: {
    _id: string;
    slug: string;
  };
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  read?: boolean;
  createdAt?: string;
}

export type SearchForType = 'search' | 'hashtag' | 'username';
