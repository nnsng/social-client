import { Stack } from '@mui/material';
import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import background from 'assets/images/background.png';
import { PageTitle } from 'components/common';
import { useLoginWithGoogle } from 'hooks';
import { IAuthFormValues } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import AuthForm from './AuthForm';

export interface IAuthLayoutProps {
  mode: 'login' | 'register';
}

export default function AuthLayout({ mode }: IAuthLayoutProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  const googleLogin = useLoginWithGoogle();

  const defaultValues: IAuthFormValues = {
    mode,
    email: '',
    password: '',
    name: '',
    username: '',
  };

  const switchMode = () => {
    if (mode === 'login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleFormSubmit = (formValues: IAuthFormValues) => {
    dispatch(authActions[mode]({ formValues, navigate }));
  };

  const handleForgotPassword = async (email: string) => {
    await authApi.forgotPassword(email);
  };

  return (
    <>
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Stack
        sx={{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
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
