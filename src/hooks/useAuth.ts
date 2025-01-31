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
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const { signIn: onGoogleLogin } = useGoogleLogin({
    clientId: env.VITE_GOOGLE_CLIENT_ID,
    isSignedIn: false,
    accessType: 'offline',
    onSuccess(res: any) {
      const token = res.tokenId;
      dispatch(googleLogin({ token, navigate }));
    },
    onFailure(error) {},
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
