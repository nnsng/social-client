import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import { NotFound, PrivateRoute } from 'components/common';
import { ACCESS_TOKEN } from 'utils/constants';
import Auth from 'features/auth';
import { authActions } from 'features/auth/authSlice';
import Blog from 'features/blog';
import Setting from 'features/setting';
import SocketClient from 'features/socket';
import { socketActions } from 'features/socket/socketSlice';
import { User } from 'models';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { env, variables } from 'utils/env';

function App() {
  const navigate = useNavigate();

  const { i18n } = useTranslation();

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
    const socket = io(env(variables.baseUrl));
    dispatch(socketActions.setSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('language') || 'en');
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <>
      <button onClick={() => changeLanguage('en')}>en</button>
      <button onClick={() => changeLanguage('vi')}>vi</button>

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

        <Route path="/login" element={<Auth mode="login" />} />

        <Route path="/register" element={<Auth mode="register" />} />

        <Route path=":404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
