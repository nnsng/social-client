import Chat from 'features/chat';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from 'utils/constants';

export interface IPrivateRouteProps {
  children: React.ReactNode;
  hideChat?: boolean;
}

export function PrivateRoute(props: IPrivateRouteProps) {
  const { children, hideChat } = props;

  const isAuth = localStorage.getItem(ACCESS_TOKEN);

  return isAuth ? (
    <>
      {children}
      {!hideChat && <Chat />}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
