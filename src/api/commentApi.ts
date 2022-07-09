import { IComment } from 'models';
import axiosClient from './axiosClient';

const category = '/comments';

export const commentApi = {
  getPostComment(postId: string) {
    const url = `${category}`;
    return axiosClient.get(url, { params: { postId } });
  },
  create(data: IComment) {
    const url = `${category}`;
    return axiosClient.post(url, data);
  },
  edit(data: IComment) {
    const url = `${category}/${data._id}`;
    return axiosClient.patch(url, data);
  },
  remove(data: IComment) {
    const url = `${category}/${data._id}`;
    return axiosClient.delete(url);
  },
  like(id: string) {
    const url = `${category}/${id}/like`;
    return axiosClient.post(url);
  },
};
