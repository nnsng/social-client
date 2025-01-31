import { env } from '@/utils/env';
import axiosClient from './axiosClient';

export const otherApi = {
  uploadImageToCDN(data: FormData) {
    const url = env.VITE_CDN_URL;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
