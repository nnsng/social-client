import ChangePasswordForm from 'features/settings/components/ChangePasswordForm';
import { IChangePasswordFormValues, IDecodedToken, IField } from 'models';
import React from 'react';
import jwtDecode from 'jwt-decode';

export interface INewPasswordProps {
  token: string;
}

export function NewPassword({ token }: INewPasswordProps) {
  const decoded: IDecodedToken = jwtDecode(token);
  if (!decoded) return null;

  const defaultValues: IChangePasswordFormValues = {
    userId: decoded._id,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formValues: IChangePasswordFormValues) => {
    console.log(formValues);
  };

  const fieldList: IField[] = [
    {
      name: 'newPassword',
      props: {},
    },
    {
      name: 'confirmPassword',
      props: {},
    },
  ];
  return (
    <ChangePasswordForm
      fieldList={fieldList}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
