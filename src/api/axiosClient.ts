import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from 'constants/common';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // Handle token ...
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (token && config.url !== import.meta.env.VITE_CDN_URL) {
    if (config.headers) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data ?? response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
