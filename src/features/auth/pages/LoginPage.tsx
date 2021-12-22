import { Stack } from '@mui/material';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import { AuthFormValue } from 'models';
import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import AuthForm from '../components/AuthForm';

export function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const googleLogin = useLoginWithGoogle();

  const initialValues: AuthFormValue = {
    email: '',
    password: '',
  };

  const switchMode = () => {
    navigate('/register');
  };

  const handleFormSubmit = (formValues: AuthFormValue) => {
    dispatch(authActions.login({ formValues, navigate }));
  };

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="primary.main">
      <AuthForm
        initialValues={initialValues}
        registerMode={false}
        switchMode={switchMode}
        onSubmit={handleFormSubmit}
        googleLogin={googleLogin}
      />
    </Stack>
  );
}
