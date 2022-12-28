import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { userApi } from '~/api';
import { useAppDispatch } from '~/app/hooks';
import { CustomScrollbar, PrivateRoute } from '~/components/common';
import { socketActions } from '~/features/socket/socketSlice';
import { env, variables } from '~/utils/env';
import { showErrorToastFromServer } from '~/utils/toast';
import { ACCESS_TOKEN } from './constants';
import { AuthFeature, BlogFeature, ProfilePage, SettingsFeature, SocketClient } from './features';
import { userActions } from './features/auth/userSlice';

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await userApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(userActions.setCurrentUser(user));
      } catch (error) {
        showErrorToastFromServer(error);
        dispatch(userActions.logout(navigate));
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

  return (
    <CustomScrollbar>
      <SocketClient />

      <Routes>
        <Route path="/" element={<Navigate to="/blog" replace={true} />} />

        <Route
          path="/blog/*"
          element={
            <PrivateRoute>
              <BlogFeature />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings/*"
          element={
            <PrivateRoute>
              <SettingsFeature />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<AuthFeature />} />
      </Routes>
    </CustomScrollbar>
  );
}

export default App;
