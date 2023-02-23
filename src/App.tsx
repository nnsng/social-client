import { useEffect } from 'react';
import { Route, RouteObject, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { userApi } from '~/api';
import { useAppDispatch } from '~/app/hooks';
import { CustomScrollbar } from '~/components/common';
import { socketActions } from '~/redux/slices/socketSlice';
import { env, variables } from '~/utils/env';
import { showErrorToastFromServer } from '~/utils/toast';
import { SocketClient } from './components/socket';
import { ACCESS_TOKEN } from './constants';
import { userActions } from './redux/slices/userSlice';
import routes from './routes';

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
