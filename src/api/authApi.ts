import { ChangePasswordFormValues, LoginFormValues, RegisterFormValues } from '~/models';
import axiosClient from './axiosClient';

export const authApi = {
  login(data: LoginFormValues) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  register(data: RegisterFormValues) {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
  googleLogin(idToken: string) {
    const url = '/auth/google-login';
    return axiosClient.post(url, { idToken });
  },
  active(token: string) {
    const url = '/auth/active';
    return axiosClient.post(url, { token });
  },
  reactive(_id: string) {
    const url = '/auth/reactive';
    return axiosClient.post(url, { _id });
  },
  changePassword(data: ChangePasswordFormValues) {
    const url = '/auth/password/change';
    return axiosClient.post(url, data);
  },
  forgotPassword(email: string) {
    const url = '/auth/password/forgot';
    return axiosClient.post(url, { email });
  },
  resetPassword(data: ChangePasswordFormValues) {
    const url = '/auth/password/reset';
    return axiosClient.post(url, data);
  },
};
