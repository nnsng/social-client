import { FollowResponse } from '~/components/common';
import { User } from '~/models';
import axiosClient from './axiosClient';

export const userApi = {
  getCurrentUser(): Promise<User> {
    const url = '/users/me';
    return axiosClient.get(url);
  },
  getUserInfo(username: string): Promise<Partial<User>> {
    const url = `/users/${username}`;
    return axiosClient.get(url);
  },
  updateProfile(data: Partial<User>) {
    const url = '/users/update-profile';
    return axiosClient.post(url, data);
  },
  follow(userId: string): Promise<FollowResponse> {
    const url = '/users/follow';
    return axiosClient.post(url, { userId });
  },
  unfollow(userId: string): Promise<FollowResponse> {
    const url = '/users/unfollow';
    return axiosClient.post(url, { userId });
  },
};
