import { authActions } from 'features/auth/authSlice';
import { useGoogleLogin } from 'react-google-login';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';

export default function useLoginWithGoogle() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSuccess = async (res: any) => {
    const { tokenId } = res;
    dispatch(authActions.googleLogin({ tokenId, navigate }));
  };

  const onFailure = (res: any) => {
    console.log('Failed', res);
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
  });

  return signIn;
}
