import { NavigateFunction } from 'react-router-dom';
import { User } from './user';

export interface AuthResponse {
  user: User;
  token: string;
  activeToken?: string;
}

export interface AuthPayload<T> {
  formValues?: T;
  navigate?: NavigateFunction;
}

export interface GoogleAuthPayload {
  token: string;
  navigate?: NavigateFunction;
}
