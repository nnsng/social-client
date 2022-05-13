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
  follow(userId: string) {
    const url = '/users/follow';
    return axiosClient.post(url, { userId });
  },
  unfollow(userId: string) {
    const url = '/users/unfollow';
    return axiosClient.post(url, { userId });
  },
};

export default userApi;
