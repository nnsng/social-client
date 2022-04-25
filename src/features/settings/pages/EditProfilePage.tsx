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

  const handleFormSubmit = (formValues: IUser) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  return (
    <EditProfileForm
      submitting={submitting}
      defaultValues={currentUser as IUser}
      onSubmit={handleFormSubmit}
    />
  );
}
