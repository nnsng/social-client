import { ACCESS_TOKEN } from 'utils/constants';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children?: any;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = localStorage.getItem(ACCESS_TOKEN);

  return isAuth ? children : <Navigate to="/login" />;
}
