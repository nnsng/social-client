import axiosClient from './axiosClient';

const configApi = {
  getTopHashtags() {
    const url = '/config/get-top-hashtags';
    return axiosClient.get(url);
  },
};

export default configApi;
