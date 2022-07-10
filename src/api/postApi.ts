import { IListParams, IPost, ISearchObj } from 'models';
import axiosClient from './axiosClient';

const category = '/posts';

export const postApi = {
  getAll(params: IListParams) {
    const url = `${category}`;
    return axiosClient.get(url, { params });
  },
  getSavedList(params: IListParams) {
    const url = `${category}/saved`;
    return axiosClient.get(url, { params });
  },
  getBySlug(slug: string) {
    const url = `${category}/detail/${slug}`;
    return axiosClient.get(url);
  },
  getForEdit(id: string) {
    const url = `${category}/${id}`;
    return axiosClient.get(url);
  },
  search(searchObj: ISearchObj) {
    const url = `${category}/search`;
    return axiosClient.get(url, { params: searchObj });
  },
  create(data: IPost) {
    const url = `${category}`;
    return axiosClient.post(url, data);
  },
  update(data: IPost) {
    const url = `${category}/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string) {
    const url = `${category}/${id}`;
    return axiosClient.delete(url);
  },
  like(id: string) {
    const url = `${category}/${id}/like`;
    return axiosClient.post(url);
  },
  save(id: string) {
    const url = `${category}/${id}/save`;
    return axiosClient.post(url);
  },
  unSave(id: string) {
    const url = `${category}/${id}/unsave`;
    return axiosClient.post(url);
  },
  getTopHashtags() {
    const url = `${category}/get-top-hashtags`;
    return axiosClient.get(url);
  },
};
