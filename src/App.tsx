import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/common';
import Auth from 'features/auth';
import { authActions } from 'features/auth/authSlice';
import Blog from 'features/blog';
import { selectLanguage } from 'features/common/configSlice';
import Settings from 'features/settings';
import SocketClient from 'features/socket';
import { socketActions } from 'features/socket/socketSlice';
import i18next from 'i18next';
import { IUser } from 'models';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ACCESS_TOKEN } from 'utils/constants';
import { env, variables } from 'utils/env';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await authApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(authActions.setCurrentUser(user as unknown as IUser));
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <>
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
              <Settings />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/active" element={<Auth mode="active" />} />

        <Route
          path="*"
          element={
            <PrivateRoute>
              <NotFound showHeader />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
