export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  phone: string;
  role: string;
  type: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthFormValue {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordFormValue {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
