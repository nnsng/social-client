import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IUser } from 'models';
import React from 'react';
import EditProfileForm from '../components/EditProfileForm';
import { selectSettingSubmitting, settingActions } from '../settingSlice';

export function EditProfilePage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const submitting = useAppSelector(selectSettingSubmitting);

  const handleFormSubmit = (formValues: Partial<IUser>) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  const defaultValues: Partial<IUser> = {
    name: currentUser?.name,
    avatar: currentUser?.avatar,
    username: currentUser?.username,
    email: currentUser?.email,
    bio: currentUser?.bio,
  };

  return (
    <EditProfileForm
      submitting={submitting}
      defaultValues={defaultValues}
      onSubmit={handleFormSubmit}
    />
  );
}
