import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { authApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, PageTitle } from 'components/common';
import { EmptyLayout } from 'components/layouts';
import { selectCurrentUser } from 'features/auth/userSlice';
import { ChangePasswordFormValues, FormField, User } from 'models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { themeMixins } from 'utils/theme';
import queryString from 'query-string';
import { SettingTabs, EditProfileForm, ChangePasswordForm } from './components';
import { selectSettingSubmitting, settingActions } from './settingSlice';

export default function SettingFeature() {
  const { t } = useTranslation('settings');

  const location = useLocation();
  const query = queryString.parse(location.search);

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

  const renderSettingForm = (tab: string) => {
    if (tab === 'change-password') {
      return (
        <ChangePasswordForm
          fieldList={changePasswordFields}
          defaultValues={changePasswordFormValues}
          onSubmit={handleChangePassword}
          forgotPassword={handleForgotPassword}
        />
      );
    }

    return (
      <EditProfileForm
        submitting={submitting}
        defaultValues={editProfileFormValues}
        onSubmit={handleUpdateProfile}
      />
    );
  };

  return (
    <EmptyLayout>
      <PageTitle title={t('pageTitle')} />

      <Box component="main">
        <Container maxWidth="md">
          <Box>
            <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={600} textTransform="uppercase">
              {t('pageTitle')}
            </Typography>

            <Paper
              sx={{
                ...themeMixins.paperBorder(),
                my: 2,
                p: 2,
                pt: { xs: 0, sm: 2 },
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Box
                  sx={{
                    flexShrink: 0,
                    mr: { sm: 6 },
                    mb: { xs: 2, sm: 0 },
                    borderRight: { sm: 1 },
                    borderColor: { sm: 'divider' },
                  }}
                >
                  <SettingTabs />
                </Box>

                <Box flexGrow={1} pr={{ sm: 4 }}>
                  {renderSettingForm(query.tab as string)}
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Box>
    </EmptyLayout>
  );
}
