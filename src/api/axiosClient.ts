import axios from 'axios';
import queryString from 'query-string';
import { ACCESS_TOKEN } from '~/constants';
import { env, variables } from '~/utils/env';

const SERVER_URL = env(variables.serverUrl) || '';
const BASE_URL = `${SERVER_URL}/api`;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token && config.url !== env(variables.cdnUrl)) {
    config.headers && (config.headers.Authorization = `Bearer ${token}`);
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data ?? response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
