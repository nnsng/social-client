import authApi from 'api/authApi';
import { selectCurrentUser } from 'features/auth/authSlice';
import { ChangePasswordFormValue } from 'models';
import React from 'react';
import { useAppSelector } from 'app/hooks';
import { toast } from 'react-toastify';
import ChangePasswordForm from '../components/ChangePasswordForm';

export function ChangePasswordPage() {
  const currentUser = useAppSelector(selectCurrentUser);

  const initialValues: ChangePasswordFormValue = {
    userId: currentUser?._id || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleFormSubmit = async (formValues: ChangePasswordFormValue) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = () => {
    toast.info('Coming soon!');
  };

  // if (!currentUser) return null;

  return (
    <ChangePasswordForm
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      onForgotPassword={handleForgotPassword}
    />
  );
}
