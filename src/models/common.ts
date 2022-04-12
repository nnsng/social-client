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

  // [key: string]: any;
}

export interface IMenuItem {
  label?: string;
  icon?: any;
  onClick?: () => void;
  active?: boolean;
  page?: string;
}

export interface Token {
  _id: string;
  iat: number;
  exp: number;
}

export type SupportedThemeColor = '#7575FF' | '#FF652F' | '#00CC6A' | '#FFB900' | '#C239B3';
export type SupportedLanguage = 'en' | 'vi';
