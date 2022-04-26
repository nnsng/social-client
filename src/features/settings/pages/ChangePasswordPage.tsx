import authApi from 'api/authApi';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IChangePasswordFormValues } from 'models';
import React from 'react';
import { showComingSoonToast } from 'utils/common';
import ChangePasswordForm from '../components/ChangePasswordForm';

export function ChangePasswordPage() {
  const currentUser = useAppSelector(selectCurrentUser);

  const defaultValues: IChangePasswordFormValues = {
    userId: currentUser?._id as string,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleFormSubmit = async (formValues: IChangePasswordFormValues) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = () => {
    showComingSoonToast();
  };

  return (
    <ChangePasswordForm
      defaultValues={defaultValues}
      onSubmit={handleFormSubmit}
      forgotPassword={handleForgotPassword}
    />
  );
}
