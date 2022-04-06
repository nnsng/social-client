import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { TOKEN } from 'utils/constants';
import { env, variables } from 'utils/env';

const axiosClient = axios.create({
  baseURL: env(variables.baseApiUrl),
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem(TOKEN.ACCESS);
  if (accessToken && config.url !== env(variables.cdnUrl)) {
    config.headers && (config.headers.Authorization = `Bearer ${accessToken}`);
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
