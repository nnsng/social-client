import { SearchParams } from '~/models';
import { env, variables } from '~/utils/env';
import axiosClient from './axiosClient';

export const otherApi = {
  search(params: SearchParams) {
    const url = '/search';
    return axiosClient.get(url, { params });
  },

  uploadImageToCDN(data: FormData) {
    const url = env(variables.cdnUrl);
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
