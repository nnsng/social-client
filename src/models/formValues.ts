export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface ChangePasswordFormValues {
  userId?: string;
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
  token?: string;
}
