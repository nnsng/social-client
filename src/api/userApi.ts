import { IUser } from 'models';
import axiosClient from './axiosClient';

const userApi = {
  getCurrentUser() {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  getUserInfo(username: string) {
    const url = `/users/${username}`;
    return axiosClient.get(url);
  },
  updateProfile(data: Partial<IUser>) {
    const url = '/users/update-profile';
    return axiosClient.post(url, data);
  },
};

export default userApi;
