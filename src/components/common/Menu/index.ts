import { NavigateFunction } from 'react-router-dom';

export interface GetMenuProps {
  navigate?: NavigateFunction;
  dispatch?: any;
  t?: any;
}

export * from './GetUserMenu';
export * from './GetPostMenu';
