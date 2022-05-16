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
  search?: string;
  hashtag?: string;
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
