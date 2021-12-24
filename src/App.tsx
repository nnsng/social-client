import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/common';
import { ACCESS_TOKEN } from 'constants/common';
import { authActions } from 'features/auth/authSlice';
import { LoginPage, RegisterPage } from 'features/auth/pages';
import Blog from 'features/post';
import Setting from 'features/setting';
import SocketClient from 'features/socket/SocketClient';
import { socketActions } from 'features/socket/socketSlice';
import { User } from 'models';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) return;

        const user = await authApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(authActions.setCurrentUser(user as unknown as User));
      } catch (error) {
        console.log('Failed to get current user', error);
        dispatch(authActions.logout({ navigate }));
      }
    })();
  }, [dispatch, navigate]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL as string);
    dispatch(socketActions.setSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return (
    <>
      <SocketClient />

      <Routes>
        <Route path="/" element={<Navigate to="/blog" />} />

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

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
