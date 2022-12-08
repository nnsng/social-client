import { env, variables } from '~/utils/env';
import axiosClient from './axiosClient';

export const otherApi = {
  uploadImageToCDN(data: FormData) {
    const url = env(variables.cdnUrl);
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
