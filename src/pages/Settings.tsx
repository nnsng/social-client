import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { authApi } from '~/api';
import { useAppDispatch } from '~/app/hooks';
import { EmptyLayout } from '~/components/layouts';
import { Settings } from '~/components/settings';
import { settingActions } from '~/redux/slices/settingSlice';
import { usePageTitle } from '~/hooks';
import { ChangePasswordFormValues, User } from '~/models';
import { themeMixins } from '~/utils/theme';

export function SettingsPage() {
  const { t } = useTranslation('settingsPage');

  const dispatch = useAppDispatch();

  usePageTitle(t('pageTitle'));

  const handleUpdateProfile = (formValues: Partial<User>) => {
    dispatch(settingActions.updateProfile(formValues));
  };

  const handleChangePassword = async (formValues: ChangePasswordFormValues) => {
    await authApi.changePassword(formValues);
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) return;
    await authApi.forgotPassword(email);
  };

  return (
    <EmptyLayout maxWidth="md">
      <Box>
        <Typography variant="h5" component="h2" fontWeight={600} textTransform="uppercase">
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
          <Settings
            onProfileChange={handleUpdateProfile}
            onPasswordChange={handleChangePassword}
            onForgotPassword={handleForgotPassword}
          />
        </Paper>
      </Box>
    </EmptyLayout>
  );
}
