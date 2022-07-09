import { IUser } from 'models';
import axiosClient from './axiosClient';

const category = '/users';

export const userApi = {
  getCurrentUser() {
    const url = `${category}/me`;
    return axiosClient.get(url);
  },
  getUserInfo(username: string) {
    const url = `${category}/${username}`;
    return axiosClient.get(url);
  },
  updateProfile(data: Partial<IUser>) {
    const url = `${category}/update-profile`;
    return axiosClient.post(url, data);
  },
  follow(userId: string) {
    const url = `${category}/follow`;
    return axiosClient.post(url, { userId });
  },
  unfollow(userId: string) {
    const url = `${category}/unfollow`;
    return axiosClient.post(url, { userId });
  },
  search(username: string) {
    const url = `${category}/search`;
    return axiosClient.get(url, { params: { username } });
  },
};
