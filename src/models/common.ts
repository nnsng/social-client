export interface IPaginationParams {
  page: number;
  limit: number;
  totalRows: number;
}

export interface IListResponse<T> {
  data: T[];
  pagination: IPaginationParams;
}

export interface IListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  username?: string;
  hashtag?: string;
}

export interface IMenuItem {
  label?: string;
  icon?: any;
  onClick?: () => void;
  show?: boolean;
}
