import { SETTING_TABS } from '~/constants';
import { ChangePasswordFormValues, User } from '~/models';
import { ChangePasswordForm } from './ChangePasswordForm';
import { EditProfileForm } from './EditProfileForm';

interface SettingFormProps {
  activeTab: string;
  user: User | null;
  onUpdateProfile?: (values: Partial<User>) => void;
  onChangePassword?: (values: ChangePasswordFormValues) => void;
  onForgotPassword?: () => void;
}

export function SettingForm(props: SettingFormProps) {
  const { activeTab, user, onUpdateProfile, onChangePassword, onForgotPassword } = props;

  const { EDIT_PROFILE, CHANGE_PASSWORD } = SETTING_TABS;

  if (!user) return null;

  return (
    <>
      {activeTab === EDIT_PROFILE && (
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

      {activeTab === CHANGE_PASSWORD && (
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
