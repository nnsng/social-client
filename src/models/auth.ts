import { NavigateFunction } from 'react-router-dom';
import { User } from './user';

export interface AuthResponse {
  user: User;
  token: string;
  activeToken?: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

export interface ChangePasswordFormValues {
  userId?: string;
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

export interface AuthPayload {
  formValues?: AuthFormValues;
  token?: string;
  navigate?: NavigateFunction;
}
