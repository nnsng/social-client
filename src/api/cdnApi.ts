import axiosClient from './axiosClient';

const cdnApi = {
  getImageUrl(data: FormData) {
    const url = import.meta.env.VITE_CDN_URL as string;
    return axiosClient.post(url, data);
  },
};

export default cdnApi;
