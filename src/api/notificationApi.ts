import axiosClient from './axiosClient';

export const notificationApi = {
  getAll() {
    const url = '/notification';
    return axiosClient.get(url);
  },
};
