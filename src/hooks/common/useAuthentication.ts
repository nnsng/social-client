import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { localStorageKey } from '~/constants';
import { LoginFormValues, RegisterFormValues } from '~/models';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  googleLogin as _googleLogin,
  login as _login,
  register as _register,
  selectCurrentUser,
  userActions,
} from '~/store/slices/userSlice';
import { delay } from '~/utils/common';
import { env, variables } from '~/utils/env';

export function useAuthentication() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const clientId = env(variables.googleClientId);
  const { signIn: googleLogin } = useGoogleLogin({
    clientId,
    isSignedIn: false,
    accessType: 'offline',
    onSuccess(res: any) {
      const token = res.tokenId;
      dispatch(_googleLogin({ token, navigate }));
    },
    onFailure(error) {},
  });

  const login = (formValues: LoginFormValues) => {
    dispatch(_login({ formValues, navigate }));
  };

  const register = (formValues: RegisterFormValues) => {
    dispatch(_register({ formValues, navigate }));
  };

  const logout = async () => {
    await delay(500);
    dispatch(userActions.setCurrentUser(null));
    localStorage.removeItem(localStorageKey.ACCESS_TOKEN);
    navigate('/login');
  };

  return {
    currentUser,
    login,
    googleLogin,
    register,
    logout,
  };
}
