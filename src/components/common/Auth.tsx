import { ACCESS_TOKEN } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export function Auth() {
  const isAuth = localStorage.getItem(ACCESS_TOKEN);

  if (isAuth) return <Outlet />;

  return <Navigate to="/login" />;
}
