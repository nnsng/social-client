import { IAuthFormValues, IChangePasswordFormValues } from 'models';
import axiosClient from './axiosClient';

const category = '/auth';

export const authApi = {
  login(data: IAuthFormValues) {
    const url = `${category}/login`;
    return axiosClient.post(url, data);
  },
  register(data: IAuthFormValues) {
    const url = `${category}/register`;
    return axiosClient.post(url, data);
  },
  googleLogin(idToken: string) {
    const url = `${category}/google-login`;
    return axiosClient.post(url, { idToken });
  },
  active(token: string) {
    const url = `${category}/active`;
    return axiosClient.post(url, { token });
  },
  reactive(_id: string) {
    const url = `${category}/reactive`;
    return axiosClient.post(url, { _id });
  },
  changePassword(data: IChangePasswordFormValues) {
    const url = `${category}/password/change`;
    return axiosClient.post(url, data);
  },
  forgotPassword(email: string) {
    const url = `${category}/password/forgot`;
    return axiosClient.post(url, { email });
  },
  resetPassword(data: IChangePasswordFormValues) {
    const url = `${category}/password/reset`;
    return axiosClient.post(url, data);
  },
};
