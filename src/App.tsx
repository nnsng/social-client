import { userApi } from '@/api';
import { CustomScrollbar } from '@/components/common';
import { useAppDispatch } from '@/store/hooks';
import { socketActions } from '@/store/slices/socketSlice';
import { env } from '@/utils/env';
import { useEffect } from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SocketClient } from './components/socket';
import { StorageKey } from './constants';
import { useAuth } from './hooks';
import routes from './routes';
import { userActions } from './store/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();

  const { onLogout } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(StorageKey.ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await userApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(userActions.setCurrentUser(user));
      } catch (error) {
        onLogout();
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(env.VITE_SERVER_URL);
    if (!socket) return;

    dispatch(socketActions.setSocket(socket));

    return () => {
      socket.close();
    };
  }, [dispatch]);

  const createElementsFromRoutes = (routes: RouteObject[]) => {
    return routes.map(({ path, element, children }, index) => {
      if (children) {
        return (
          <Route key={Number(path) + index} path={path} element={element}>
            {createElementsFromRoutes(children)}
          </Route>
        );
      }

      return <Route key={Number(path) + index} path={path} element={element} />;
    });
  };

  return (
    <CustomScrollbar>
      <SocketClient />
      <Routes>{createElementsFromRoutes(routes)}</Routes>
    </CustomScrollbar>
  );
}

export default App;
