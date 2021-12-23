import { Stack } from '@mui/material';
import useLoginWithGoogle from 'hooks/useLoginWithGoogle';
import { AuthFormValue } from 'models';
import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions } from '../authSlice';
import AuthForm from '../components/AuthForm';

export function RegisterPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const initialValues: AuthFormValue = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  const switchMode = () => {
    navigate('/login');
  };

  const handleFormSubmit = (formValues: AuthFormValue) => {
    dispatch(authActions.register({ formValues, navigate }));
    toast.success('Đăng ký thành công');
  };

  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="primary.main">
      <AuthForm
        initialValues={initialValues}
        registerMode
        switchMode={switchMode}
        onSubmit={handleFormSubmit}
      />
    </Stack>
  );
}
