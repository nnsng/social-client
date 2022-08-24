import { NotiType, PostByType } from './types';

export interface PaginationParams {
  page: number;
  limit: number;
  totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string | undefined;
  hashtag?: string | undefined;
  username?: string;
  by?: PostByType;
}

export interface MenuItemProps {
  label?: string;
  icon?: any;
  onClick?: () => void;
  show?: boolean;
}

export interface FormField {
  name: string;
  show?: boolean;
  props?: any;
}

export interface LocationState {
  hideHeaderMenu?: boolean;
  openComment?: boolean;
  notFound?: boolean;
}

export interface Noti {
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
