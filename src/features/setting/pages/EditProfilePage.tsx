import { selectCurrentUser } from 'features/auth/authSlice';
import { User } from 'models';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import EditProfileForm from '../components/EditProfileForm';
import { selectSettingSubmitting, settingActions } from '../settingSlice';

export function EditProfilePage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const submitting = useAppSelector(selectSettingSubmitting);

  const handleFormSubmit = (formValues: User) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  if (!currentUser) return null;

  return (
    <EditProfileForm
      submitting={submitting}
      initialValues={currentUser}
      onSubmit={handleFormSubmit}
    />
  );
}
