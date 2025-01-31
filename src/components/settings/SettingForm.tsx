import { ChangePasswordFormValues, User, type SettingTab } from '@/models';
import { ChangePasswordForm } from './ChangePasswordForm';
import { EditProfileForm } from './EditProfileForm';

interface SettingFormProps {
  activeTab: SettingTab;
  user: User | null;
  onUpdateProfile?: (values: Partial<User>) => void;
  onChangePassword?: (values: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
}

export function SettingForm(props: SettingFormProps) {
  const { activeTab, user, onUpdateProfile, onChangePassword, onForgotPassword } = props;

  if (!user) return null;

  return (
    <>
      {activeTab === 'profile' && (
        <EditProfileForm
          defaultValues={{
            name: user?.name,
            avatar: user?.avatar,
            username: user?.username,
            email: user?.email,
            bio: user?.bio,
          }}
          onSubmit={onUpdateProfile}
        />
      )}

      {activeTab === 'password' && (
        <ChangePasswordForm
          defaultValues={{
            userId: user?._id,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          onSubmit={onChangePassword}
          onForgotPassword={onForgotPassword}
        />
      )}
    </>
  );
}
