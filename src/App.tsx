import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { BackdropLoading, NotFound, PrivateRoute } from 'components/common';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { selectLanguage } from 'features/common/configSlice';
import { selectSocket, socketActions } from 'features/socket/socketSlice';
import i18next from 'i18next';
import { User } from 'models';
import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ACCESS_TOKEN } from 'utils/constants';
import { env, variables } from 'utils/env';

// dynamic import
const Auth = React.lazy(() => import('features/auth'));
const Blog = React.lazy(() => import('features/blog'));
const Setting = React.lazy(() => import('features/setting'));
const SocketClient = React.lazy(() => import('features/socket'));

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const socket = useAppSelector(selectSocket);
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await authApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(authActions.setCurrentUser(user as unknown as User));
      } catch (error) {
        console.log('Failed to get current user', error);
        dispatch(authActions.logout({ navigate }));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(env(variables.serverUrl));
    if (!socket) return;

    dispatch(socketActions.setSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.emit('joinSocial', { userId: currentUser._id });

    return () => {
      socket.emit('leaveSocial', { userId: currentUser._id });
    };
  }, [socket, currentUser]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <Suspense fallback={<BackdropLoading open={true} />}>
      <SocketClient />

      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace={true} />} />

        <Route
          path="/blog/*"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings/*"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/active" element={<Auth mode="active" />} />

        <Route
          path=":404"
          element={
            <PrivateRoute>
              <NotFound showHeader />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
