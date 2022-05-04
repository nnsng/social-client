import { Stack } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { PageTitle } from 'components/common';
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

  return (
    <>
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Stack
        direction="column"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
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
