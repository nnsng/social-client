import { useEffect } from 'react';
import { userApi } from '~/api';
import { localStorageKey } from '~/constants';
import { useAppDispatch } from '~/store/hooks';
import { userActions } from '~/store/slices/userSlice';
import { useInitSocket } from '../socket';
import { useAuthentication } from './useAuthentication';

export function useInitApp() {
  useInitSocket();

  const dispatch = useAppDispatch();
  const { logout } = useAuthentication();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem(localStorageKey.ACCESS_TOKEN) || '';
        if (!token) return;

        const user = await userApi.getCurrentUser();
        if (!user) throw new Error();

        dispatch(userActions.setCurrentUser(user));
      } catch (error) {
        logout();
      }
    })();
  }, [dispatch]);
}
