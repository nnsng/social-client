import { Stack } from '@mui/material';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import { AuthFormValue } from 'models';
import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions } from './authSlice';
import AuthForm from './components/AuthForm';
import { toast } from 'react-toastify';

export interface AuthPageProps {
  mode: 'login' | 'register';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();

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
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="primary.main">
      <AuthForm defaultValues={defaultValues} switchMode={switchMode} onSubmit={handleFormSubmit} />
    </Stack>
  );
}
