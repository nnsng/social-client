import { Box, Container, Typography } from '@mui/material';
import authApi from 'api/authApi';
import { PageTitle } from 'components/common';
import ChangePasswordForm from 'features/settings/components/ChangePasswordForm';
import jwtDecode from 'jwt-decode';
import { IChangePasswordFormValues, IDecodedToken, IField } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface INewPasswordProps {
  token: string;
}

export function NewPassword({ token }: INewPasswordProps) {
  if (!token) return null;

  const decoded: IDecodedToken = jwtDecode(token);
  if (!decoded) return null;

  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const defaultValues: IChangePasswordFormValues = {
    userId: decoded._id,
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formValues: IChangePasswordFormValues) => {
    await authApi.resetPassword(formValues);
    navigate('/login', { replace: true });
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
    <>
      <PageTitle title={t('pageTitle.resetPassword')} />

      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" fontWeight={500} mb={2}>
            {t('pageTitle.resetPassword')}
          </Typography>

          <ChangePasswordForm
            fieldList={fieldList}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
          />
        </Box>
      </Container>
    </>
  );
}
