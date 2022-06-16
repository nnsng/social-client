import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { env, variables } from 'utils/env';
import { showErrorToast } from 'utils/toast';

export function useLoginWithGoogle() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSuccess = async (res: any) => {
    const token = res.tokenId;
    dispatch(authActions.googleLogin({ token, navigate }));
  };

  const onFailure = (res: any) => {};

  const clientId = env(variables.googleClientId);
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
  });

  return signIn;
}
