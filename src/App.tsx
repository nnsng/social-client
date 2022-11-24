import { userApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { CustomScrollbar, PrivateRoute } from 'components/common';
import { LocalStorageKey } from 'constants/common';
import { userActions } from 'features/auth/userSlice';
import SocketClient from 'features/socket';
import { socketActions } from 'features/socket/socketSlice';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ROUTES from 'routes';
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
        {ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.private ? <PrivateRoute>{route.element}</PrivateRoute> : route.element}
          />
        ))}
      </Routes>
    </CustomScrollbar>
  );
}

export default App;
