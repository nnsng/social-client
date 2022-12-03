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

  const tabs: string[] = ['profile', 'password'];

  const smUp = useCustomMediaQuery('up', 'sm');

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="flex-start"
      ml={-2}
      mr={{ xs: -2, sm: 0 }}
    >
      <Tabs
        orientation={smUp ? 'vertical' : 'horizontal'}
        variant="fullWidth"
        value={value}
        sx={{
          width: { xs: '100%', sm: 'unset' },
          flexShrink: 0,
        }}
        onChange={handleTabChange}
      >
        {tabs.map((tab) => (
          <Tab key={tab} label={t(`${tab}.${smUp ? 'label' : 'mobileLabel'}`)} />
        ))}
      </Tabs>

      <Box
        maxWidth={400}
        width="100%"
        borderLeft={1}
        borderColor="divider"
        px={4}
        pt={{ xs: 2, sm: 0 }}
      >
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

  return <Box width="100%">{children}</Box>;
}
