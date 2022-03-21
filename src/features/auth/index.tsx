import { Stack } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { PageTitle } from 'components/common';
import { AuthFormValue } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions } from './authSlice';
import AuthForm from './components/AuthForm';

export interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function Auth({ mode }: AuthPageProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  const defaultValues: AuthFormValue = {
    mode,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  const switchMode = () => {
    if (mode === 'login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleFormSubmit = (formValues: AuthFormValue) => {
    if (mode === 'login') {
      dispatch(authActions.login({ formValues, navigate }));
    } else {
      dispatch(authActions.register({ formValues, navigate }));
      toast.success('Đăng ký thành công');
    }
  };

  return (
    <>
      <PageTitle title={mode === 'login' ? t('pageTitle.login') : t('pageTitle.register')} />

      <Stack alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="primary.main">
        <AuthForm
          defaultValues={defaultValues}
          switchMode={switchMode}
          onSubmit={handleFormSubmit}
        />
      </Stack>
    </>
  );
}
