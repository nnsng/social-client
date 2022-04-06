import { NavigateFunction } from 'react-router-dom';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  description: string;
  phone: string;
  role: string;
  type: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthFormValue {
  email: string;
  password: string;
  mode: 'login' | 'register';
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordFormValue {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface AuthPayload {
  formValues?: AuthFormValue;
  token?: string;
  navigate?: NavigateFunction;
}
