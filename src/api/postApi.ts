import { IListParams, IPost } from 'models';
import axiosClient from './axiosClient';

const postApi = {
  getAll(params: IListParams) {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },
  getMyPosts(params: IListParams) {
    const url = '/posts/my';
    return axiosClient.get(url, { params });
  },
  getSavedPosts(params: IListParams) {
    const url = '/posts/saved';
    return axiosClient.get(url, { params });
  },
  getBySlug(slug: string) {
    const url = `/posts/detail/${slug}`;
    return axiosClient.get(url);
  },
  getPostForEdit(id: string) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  searchPosts(searchTerm: string) {
    const url = '/posts/search';
    return axiosClient.get(url, { params: { q: searchTerm } });
  },
  create(data: IPost) {
    const url = '/posts';
    return axiosClient.post(url, data);
  },
  update(data: IPost) {
    const url = `/posts/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string) {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
  like(id: string) {
    const url = `/posts/${id}/like`;
    return axiosClient.post(url);
  },
  save(id: string) {
    const url = `/posts/${id}/save`;
    return axiosClient.post(url);
  },
  unSave(id: string) {
    const url = `/posts/${id}/unsave`;
    return axiosClient.post(url);
  },
};

export default postApi;
