import { Notification } from '~/models';
import axiosClient from './axiosClient';

export const notificationApi = {
  getAll(): Promise<Notification[]> {
    const url = '/notification';
    return axiosClient.get(url);
  },
};
