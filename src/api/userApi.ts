import { IFollowResponse } from 'components/common';
import { IUser } from 'models';
import axiosClient from './axiosClient';

export const userApi = {
  getCurrentUser(): Promise<IUser> {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  getUserInfo(username: string): Promise<Partial<IUser>> {
    const url = `/users/${username}`;
    return axiosClient.get(url);
  },
  updateProfile(data: Partial<IUser>) {
    const url = '/users/update-profile';
    return axiosClient.post(url, data);
  },
  follow(userId: string): Promise<IFollowResponse> {
    const url = '/users/follow';
    return axiosClient.post(url, { userId });
  },
  unfollow(userId: string): Promise<IFollowResponse> {
    const url = '/users/unfollow';
    return axiosClient.post(url, { userId });
  },
  search(username: string) {
    const url = '/users/search';
    return axiosClient.get(url, { params: { username } });
  },
};
