import { Breakpoint } from '@mui/material';
import { IconType } from './mui';
import { PostByTypes } from './types';
import { QueryOptions } from '@tanstack/react-query';

export interface LayoutProps {
  maxWidth?: false | Breakpoint;
}

export interface PaginationParams {
  page: number;
  limit: number;
  totalRows: number;
  totalPage?: number;
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
  username?: string;
  by?: PostByTypes;
}

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

export interface SearchResult {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  url: string;
}

export interface SidebarItem {
  label: string;
  icon: IconType;
  activeIcon: IconType;
  active?: boolean;
  onClick?: () => void;
}

export interface SettingTabItem {
  label: string;
  tab: string;
}

export interface SearchParams {
  search: 'post' | 'user';
  q: string;
}

export interface SearchFilter {
  search?: string;
  username?: string;
}

export type TanStackQueryOptions = Omit<QueryOptions, 'queryKey' | 'queryFn'>;
