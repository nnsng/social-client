import { User } from '~/models';
import axiosClient from './axiosClient';

export const userApi = {
  getCurrentUser(): Promise<User> {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  getUserInfo(username: string): Promise<Partial<User>> {
    const url = `/users/info/${username}`;
    return axiosClient.get(url);
  },
  updateProfile(data: Partial<User>) {
    const url = '/users/update-profile';
    return axiosClient.post(url, data);
  },
  follow(userId: string): Promise<{ [key: string]: Partial<User> }> {
    const url = '/users/follow';
    return axiosClient.post(url, { userId });
  },
  unfollow(userId: string): Promise<{ [key: string]: Partial<User> }> {
    const url = '/users/unfollow';
    return axiosClient.post(url, { userId });
  },
  search(q: string, followed?: boolean): Promise<Partial<User>[]> {
    const url = '/users/search';
    return axiosClient.get(url, { params: { q, followed } });
  },
};
