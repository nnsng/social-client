import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { userApi } from '~/api';
import { useAppDispatch } from '~/app/hooks';
import { CustomScrollbar, PrivateRoute } from '~/components/common';
import { socketActions } from '~/redux/slices/socketSlice';
import { env, variables } from '~/utils/env';
import { showErrorToastFromServer } from '~/utils/toast';
import { EmptyLayout } from './components/layouts';
import { SocketClient } from './components/socket';
import { ACCESS_TOKEN } from './constants';
import { userActions } from './redux/slices/userSlice';
import { privateRoutes, publicRoutes } from './routes';

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
        {privateRoutes.map((route, idx) => {
          const Layout = route.layout ?? EmptyLayout;
          const Component = route.component;

          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <PrivateRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </PrivateRoute>
              }
            />
          );
        })}

        {publicRoutes.map((route, idx) => {
          const Component = route.component;

          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <EmptyLayout>
                  <Component />
                </EmptyLayout>
              }
            />
          );
        })}
      </Routes>
    </CustomScrollbar>
  );
}

export default App;
