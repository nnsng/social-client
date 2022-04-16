import { PaletteMode } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';
import { SupportedLanguage, SupportedThemeColor } from './common';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  role: string;
  type: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthFormValues {
  mode: 'login' | 'register';
  email: string;
  password: string;
  fullName?: string;
  username?: string;
}

export interface ChangePasswordFormValue {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface AuthPayload {
  formValues?: AuthFormValues;
  token?: string;
  navigate?: NavigateFunction;
}

export interface UserConfig {
  theme: PaletteMode;
  color: SupportedThemeColor;
  lang: SupportedLanguage;
}
