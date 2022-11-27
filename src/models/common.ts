import { Breakpoint, GridProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { PostByType } from './types';

export interface LayoutProps {
  children: ReactNode;
  maxWidth?: false | Breakpoint;
  spacing?: GridProps['spacing'];
}

export interface RouteItem {
  path: string;
  element: ReactElement;
  private?: boolean;
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
  search?: string | undefined;
  hashtag?: string | undefined;
  username?: string;
  by?: PostByType;
}

export type MenuOptionType = 'save' | 'unsave' | 'edit' | 'delete' | 'copyLink' | 'report';

export interface MenuOption {
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

export interface SearchResultItem {
  _id: string;
  name: string;
  image: string;
  url: string;
}
