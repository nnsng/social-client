import {
  AuthResponse,
  ChangePasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
} from '~/models';
import axiosClient from './axiosClient';

const clientUrl = window.location.origin;

export const authApi = {
  login(data: LoginFormValues): Promise<AuthResponse> {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  googleLogin(idToken: string): Promise<AuthResponse> {
    const url = '/auth/google-login';
    return axiosClient.post(url, { idToken });
  },
  register(data: RegisterFormValues) {
    const url = '/auth/register';
    return axiosClient.post(url, data, { params: { clientUrl } });
  },
  active(token: string) {
    const url = '/auth/active';
    return axiosClient.post(url, { token });
  },
  reactive(_id: string) {
    const url = '/auth/reactive';
    return axiosClient.post(url, { _id }, { params: { clientUrl } });
  },
  changePassword(data: ChangePasswordFormValues) {
    const url = '/auth/password/change';
    return axiosClient.post(url, data);
  },
  forgotPassword(email: string) {
    const url = '/auth/password/forgot';
    return axiosClient.post(url, { email }, { params: { clientUrl } });
  },
  resetPassword(data: ChangePasswordFormValues) {
    const url = '/auth/password/reset';
    return axiosClient.post(url, data);
  },
};
