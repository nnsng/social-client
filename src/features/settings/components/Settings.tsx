import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useCustomMediaQuery } from 'hooks';
import { ChangePasswordFormValues, User } from 'models';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordForm } from './ChangePasswordForm';
import { EditProfileForm } from './EditProfileForm';

export interface SettingsProps {
  onProfileChange?: (values: Partial<User>) => void;
  onPasswordChange?: (values: ChangePasswordFormValues) => void;
  onForgotPassword?: (email: string) => void;
}

export function Settings(props: SettingsProps) {
  const { onProfileChange, onPasswordChange, onForgotPassword } = props;

  const { t } = useTranslation('settings');

  const currentUser = useAppSelector(selectCurrentUser);

  const [value, setValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleForgotPassword = () => {
    onForgotPassword?.(currentUser?.email || '');
  };

  const smUp = useCustomMediaQuery('up', 'sm');

  return (
    <Stack alignItems="flex-start" ml={-2}>
      <Tabs orientation="vertical" value={value} onChange={handleTabChange}>
        <Tab label={t(`profile.${smUp ? 'label' : 'mobileLabel'}`)} sx={{ minWidth: 220 }} />
        <Tab label={t(`password.${smUp ? 'label' : 'mobileLabel'}`)} sx={{ minWidth: 220 }} />
      </Tabs>

      <Box flexGrow={1} borderLeft={1} borderColor="divider" pl={3}>
        <TabPanel value={value} index={0}>
          <EditProfileForm
            defaultValues={{
              name: currentUser?.name,
              avatar: currentUser?.avatar,
              username: currentUser?.username,
              email: currentUser?.email,
              bio: currentUser?.bio,
            }}
            onSubmit={onProfileChange}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ChangePasswordForm
            defaultValues={{
              userId: currentUser?._id,
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            onSubmit={onPasswordChange}
            onForgotPassword={handleForgotPassword}
          />
        </TabPanel>
      </Box>
    </Stack>
  );
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  if (value !== index) return null;

  return <Box sx={{ p: 3 }}>{children}</Box>;
}
