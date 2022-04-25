import { NavigateFunction } from 'react-router-dom';

export interface IGetMenuProps {
  navigate?: NavigateFunction;
  dispatch?: any;
  t?: any;
}

export * from './GetUserMenu';
export * from './GetPostMenu';
