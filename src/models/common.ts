export interface TokenDecoded {
  _id: string;
  iat: number | string;
  exp: number | string;
}

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
  keyword?: string;
  username?: string;
}

export interface IMenuItem {
  label?: string;
  icon?: any;
  onClick?: () => void;
  show?: boolean;
}

export interface Token {
  _id: string;
  iat: number;
  exp: number;
}
