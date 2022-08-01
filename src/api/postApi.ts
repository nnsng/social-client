import { IListParams, IPost, ISearchObj } from 'models';
import axiosClient from './axiosClient';

export const postApi = {
  getAll(params: IListParams) {
    const url = '/posts';
    return axiosClient.get(url, { params });
  },
  getSavedList(params: IListParams) {
    const url = '/posts/saved';
    return axiosClient.get(url, { params });
  },
  getBySlug(slug: string) {
    const url = `/posts/detail/${slug}`;
    return axiosClient.get(url);
  },
  getForEdit(id: string) {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  search(searchObj: ISearchObj) {
    const url = '/posts/search';
    return axiosClient.get(url, { params: searchObj });
  },
  create(data: IPost): Promise<IPost> {
    const url = '/posts';
    return axiosClient.post(url, data);
  },
  update(data: IPost): Promise<IPost> {
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
  getTopHashtags(): Promise<string[]> {
    const url = '/posts/get-top-hashtags';
    return axiosClient.get(url);
  },
};
