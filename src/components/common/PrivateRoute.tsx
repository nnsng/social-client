import { LocalStorageKey } from 'constants/common';
import ChatFeature from 'features/chat';
import { ReactChild } from 'react';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children: ReactChild;
  hideChat?: boolean;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children, hideChat } = props;

  const isAuth = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

  return isAuth ? (
    <>
      {children}
      {!hideChat && <ChatFeature />}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
