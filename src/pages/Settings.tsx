import { authApi } from '@/api';
import { PageTitle } from '@/components/common';
import { SettingForm, SettingTabs } from '@/components/settings';
import { usePageTitle } from '@/hooks';
import { ChangePasswordFormValues, SettingTabItem, User, type SettingTab } from '@/models';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser, updateCurrentUserAsync } from '@/store/slices/userSlice';
import { themeMixins } from '@/utils/theme';
import { Box, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

export function SettingsPage() {
  const { tab: activeTab } = useParams<{ tab: SettingTab }>();
  const { t } = useTranslation('settingsPage');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  usePageTitle(t('pageTitle'));

  const handleUpdateProfile = (formValues: Partial<User>) => {
    dispatch(updateCurrentUserAsync(formValues));
  };

  const handleChangePassword = async (formValues: ChangePasswordFormValues) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = async () => {
    if (!currentUser?.email) return;
    await authApi.forgotPassword(currentUser.email);
  };

  const tabs: SettingTabItem[] = [
    {
      label: t('tabs.editProfile'),
      tab: 'profile',
    },
    {
      label: t('tabs.changePassword'),
      tab: 'password',
    },
  ];

  const isValidTab = tabs.some((tab) => tab.tab === activeTab);

  if (!activeTab || !isValidTab) {
    return <Navigate to={`/settings/profile`} replace />;
  }

  return (
    <Box>
      <PageTitle>{t('pageTitle')}</PageTitle>

      <Paper
        sx={{
          ...themeMixins.getPaperStyles(),
          overflow: 'hidden',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <SettingTabs tabs={tabs} activeTab={activeTab} />

          <Box
            sx={{
              flex: 1,
              py: { xs: 2, md: 3 },
              px: { xs: 3, sm: 6 },
              borderWidth: 0,
              borderLeftWidth: { xs: 0, md: 1 },
              borderTopWidth: { xs: 1, md: 0 },
              borderStyle: 'solid',
              borderColor: 'divider',
            }}
          >
            <SettingForm
              activeTab={activeTab}
              user={currentUser}
              onUpdateProfile={handleUpdateProfile}
              onChangePassword={handleChangePassword}
              onForgotPassword={handleForgotPassword}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
