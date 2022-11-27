import { LocalStorageKey } from 'constants/common';
import { ReactChild } from 'react';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children: ReactChild;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;

  const isAuth = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

  return isAuth ? <>{children}</> : <Navigate to="/login" />;
}
