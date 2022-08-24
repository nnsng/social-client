import { Stack } from '@mui/material';
import { authApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import background from 'assets/images/background.png';
import { PageTitle } from 'components/common';
import { useLoginWithGoogle } from 'hooks';
import { AuthFormValues } from 'models';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthModeTypes } from '..';
import { userActions } from '../userSlice';
import AuthForm from './AuthForm';

export interface AuthLayoutProps {
  mode: AuthModeTypes;
}

export default function AuthLayout({ mode }: AuthLayoutProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  const googleLogin = useLoginWithGoogle();

  useEffect(() => {
    dispatch(userActions.setSubmitting(false));
  }, [mode]);

  const defaultValues: AuthFormValues = {
    email: '',
    password: '',
    name: '',
    username: '',
  };

  const switchMode = () => {
    navigate(mode === 'login' ? '/register' : '/login');
  };

  const handleFormSubmit = (formValues: AuthFormValues) => {
    dispatch(userActions[mode]({ formValues, navigate }));
  };

  const handleForgotPassword = async (email: string) => {
    await authApi.forgotPassword(email);
  };

  return (
    <>
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            bgcolor: 'common.black',
            opacity: 0.5,
          },
        }}
      >
        <AuthForm
          mode={mode}
          defaultValues={defaultValues}
          switchMode={switchMode}
          onSubmit={handleFormSubmit}
          onGoogleLogin={googleLogin}
          onForgotPassword={handleForgotPassword}
        />
      </Stack>
    </>
  );
}
