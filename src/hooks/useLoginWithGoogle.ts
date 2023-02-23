import { useAppDispatch } from '~/store/hooks';
import { userActions } from '~/store/slices/userSlice';
import { useGoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { env, variables } from '~/utils/env';

export function useLoginWithGoogle() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSuccess = async (res: any) => {
    const token = res.tokenId;
    dispatch(userActions.googleLogin({ token, navigate }));
  };

  const onFailure = (error: any) => {};

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
