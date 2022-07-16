import { PaletteMode } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';

export interface IFollow {
  _id: string;
  name: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  following?: IFollow[];
  followers?: IFollow[];
  role: string;
  type: string;
  createdAt?: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  activeToken?: string;
}

export interface IAuthFormValues {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

export interface IChangePasswordFormValues {
  userId?: string;
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

export interface IAuthPayload {
  formValues?: IAuthFormValues;
  token?: string;
  navigate?: NavigateFunction;
}

export interface IUserConfig {
  theme: PaletteMode;
  color: string;
  lang: string;
}

export interface IField {
  name: string;
  show?: boolean;
  props?: object;
}
