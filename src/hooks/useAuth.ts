import { StorageKey } from '@/constants';
import { LoginFormValues, RegisterFormValues } from '@/models';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  googleLogin,
  login,
  register,
  selectCurrentUser,
  userActions,
} from '@/store/slices/userSlice';
import { delay } from '@/utils/common';
import { env } from '@/utils/env';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const onGoogleLogin = useGoogleLogin({
    onSuccess(res) {
      const token = res.access_token;
      dispatch(googleLogin({ token, navigate }));
    },
  });

  const onLogin = (formValues: LoginFormValues) => {
    dispatch(login({ formValues, navigate }));
  };

  const onRegister = (formValues: RegisterFormValues) => {
    dispatch(register({ formValues, navigate }));
  };

  const onLogout = async () => {
    await delay(500);
    dispatch(userActions.setCurrentUser(null));
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
    navigate('/login');
  };

  return {
    currentUser,
    onLogin,
    onGoogleLogin,
    onRegister,
    onLogout,
  };
}
