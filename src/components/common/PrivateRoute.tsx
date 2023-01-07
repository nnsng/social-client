import { ReactChild } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '~/constants';

export interface PrivateRouteProps {
  children: ReactChild;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;

  const isAuth = localStorage.getItem(ACCESS_TOKEN);

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
}
