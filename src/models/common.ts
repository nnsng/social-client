import { Breakpoint } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { IconType } from './mui';
import { PostByTypes } from './types';

export interface LayoutProps {
  children: ReactNode;
  maxWidth?: false | Breakpoint;
}

export interface RouteItem {
  path: string;
  component: () => ReactElement;
  layout?: (props: LayoutProps) => ReactElement;
  layoutProps?: Partial<LayoutProps>;
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

export interface SearchResultItem {
  _id: string;
  name: string;
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
