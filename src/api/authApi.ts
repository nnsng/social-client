import { IAuthFormValues, IChangePasswordFormValues, IUser } from 'models';
import axiosClient from './axiosClient';

const authApi = {
  login(data: IAuthFormValues) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  register(data: IAuthFormValues) {
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
  getCurrentUser() {
    const url = '/auth/me';
    return axiosClient.get(url);
  },
  updateProfile(data: IUser) {
    const url = '/auth/update-profile';
    return axiosClient.post(url, data);
  },
  changePassword(data: IChangePasswordFormValues) {
    const url = '/auth/change-password';
    return axiosClient.post(url, data);
  },
};

export default authApi;
