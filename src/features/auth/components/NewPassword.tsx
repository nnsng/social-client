import { Box, Container, Typography } from '@mui/material';
import { authApi } from 'api';
import { PageTitle } from 'components/common';
import ChangePasswordForm from 'features/settings/components/ChangePasswordForm';
import { ChangePasswordFormValues, FormField } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins } from 'utils/theme';

export interface NewPasswordProps {
  token: string;
  mode: 'createPassword' | 'resetPassword';
}

export function NewPassword({ token, mode }: NewPasswordProps) {
  if (!token) return null;

  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const defaultValues: ChangePasswordFormValues = {
    token,
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formValues: ChangePasswordFormValues) => {
    await authApi.resetPassword(formValues);
    navigate('/login', { replace: true });
  };

  const fieldList: FormField[] = [
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
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Container maxWidth="sm">
        <Box mt={3} p={3} sx={{ ...themeMixins.paperBorder() }}>
          <Typography fontSize={24} fontWeight={500} mb={2}>
            {t(`pageTitle.${mode}`)}
          </Typography>

          <ChangePasswordForm
            fieldList={fieldList}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitButtonLabel={t(`btnLabel.${mode}`)}
          />
        </Box>
      </Container>
    </>
  );
}
