import { PaletteMode } from '@mui/material';

export interface FollowUser {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  following?: FollowUser[];
  followers?: FollowUser[];
  role: string;
  type: string;
  createdAt?: string;
}

export interface UserConfig {
  mode: PaletteMode;
  mainColor: string;
  language: string;
}

export type UserConfigKey = keyof UserConfig;
