import { authApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/common';
import { selectCurrentUser } from 'features/auth/userSlice';
import { ChangePasswordFormValues, FormField, User } from 'models';
import { selectSettingSubmitting, settingActions } from '../settingSlice';
import ChangePasswordForm from './ChangePasswordForm';
import EditProfileForm from './EditProfileForm';

export interface SettingLayoutProps {
  mode: 'edit-profile' | 'change-password';
}

export default function SettingLayout({ mode }: SettingLayoutProps) {
  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectSettingSubmitting);
  const currentUser = useAppSelector(selectCurrentUser);
  const { _id, name, avatar, username, email, bio } = currentUser || {};

  const handleUpdateProfile = (formValues: Partial<User>) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  const handleChangePassword = async (formValues: ChangePasswordFormValues) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = async () => {
    if (!email) return;
    await authApi.forgotPassword(email);
  };

  const editProfileFormValues: Partial<User> = {
    name,
    avatar,
    username,
    email,
    bio,
  };

  const changePasswordFormValues: ChangePasswordFormValues = {
    userId: _id,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const changePasswordFields: FormField[] = [
    { name: 'currentPassword', props: {} },
    { name: 'newPassword', props: {} },
    { name: 'confirmPassword', props: {} },
  ];

  return !currentUser ? (
    <NotFound />
  ) : mode === 'edit-profile' ? (
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
