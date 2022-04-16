import { Stack } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { PageTitle } from 'components/common';
import { AuthFormValues } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import AuthForm from './AuthForm';

export interface FormLayoutProps {
  mode: 'login' | 'register';
}

export default function FormLayout({ mode }: FormLayoutProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  const defaultValues: AuthFormValues = {
    mode,
    email: '',
    password: '',
    fullName: '',
    username: '',
  };

  const switchMode = () => {
    if (mode === 'login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleFormSubmit = (formValues: AuthFormValues) => {
    dispatch(authActions[mode]({ formValues, navigate }));
  };

  return (
    <>
      <PageTitle title={mode === 'login' ? t('pageTitle.login') : t('pageTitle.register')} />

      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="primary.main"
      >
        <AuthForm
          defaultValues={defaultValues}
          switchMode={switchMode}
          onSubmit={handleFormSubmit}
        />
      </Stack>
    </>
  );
}
