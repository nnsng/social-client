import { StorageKey } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

export function Auth() {
  const isAuth = localStorage.getItem(StorageKey.ACCESS_TOKEN);

  if (isAuth) return <Outlet />;

  return <Navigate to="/login" />;
}
