import authApi from 'api/authApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IChangePasswordFormValues, IField, IUser } from 'models';
import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import EditProfileForm from './EditProfileForm';
import { selectSettingSubmitting, settingActions } from '../settingSlice';

export interface ISettingLayoutProps {
  mode: 'edit-profile' | 'change-password';
}

export default function SettingLayout({ mode }: ISettingLayoutProps) {
  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectSettingSubmitting);
  const currentUser = useAppSelector(selectCurrentUser);
  const { _id, name, avatar, username, email, bio } = currentUser || {};

  const handleUpdateProfile = (formValues: Partial<IUser>) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  const handleChangePassword = async (formValues: IChangePasswordFormValues) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = async () => {
    if (!email) return;
    await authApi.forgotPassword(email);
  };

  const editProfileFormValues: Partial<IUser> = {
    name,
    avatar,
    username,
    email,
    bio,
  };

  const changePasswordFormValues: IChangePasswordFormValues = {
    userId: _id,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const changePasswordFields: IField[] = [
    { name: 'currentPassword', props: {} },
    { name: 'newPassword', props: {} },
    { name: 'confirmPassword', props: {} },
  ];

  return mode === 'edit-profile' ? (
    <EditProfileForm
      submitting={submitting}
      defaultValues={editProfileFormValues}
      onSubmit={handleUpdateProfile}
    />
  ) : (
    <ChangePasswordForm
      fieldList={changePasswordFields}
      defaultValues={changePasswordFormValues}
      onSubmit={handleChangePassword}
      forgotPassword={handleForgotPassword}
    />
  );
}
