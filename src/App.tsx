import { userApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { CustomScrollbar, NotFound, PrivateRoute } from 'components/common';
import { LocalStorageKey } from 'constants/common';
import Auth from 'features/auth';
import { userActions } from 'features/auth/userSlice';
import Blog from 'features/blog';
import ProfilePage from 'features/profile';
import Settings from 'features/settings';
import SocketClient from 'features/socket';
import { socketActions } from 'features/socket/socketSlice';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { env, variables } from 'utils/env';
import { showErrorToast } from 'utils/toast';

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await userApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(userActions.setCurrentUser(user));
      } catch (error) {
        showErrorToast(error);
        dispatch(userActions.logout({ navigate }));
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
        <Route path="/reset-password" element={<Auth mode="resetPassword" />} />
        <Route path="/create-password" element={<Auth mode="createPassword" />} />

        <Route
          path="user/:username"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute hideChat>
              <NotFound showHeader />
            </PrivateRoute>
          }
        />
      </Routes>
    </CustomScrollbar>
  );
}

export default App;
