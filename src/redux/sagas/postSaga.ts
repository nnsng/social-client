import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '~/api';
import { ListParams, ListResponse, Post } from '~/models';
import { showErrorToastFromServer } from '~/utils/toast';
import { postActions } from '../slices/postSlice';

function* fetchPostList(action: PayloadAction<ListParams>) {
  const params: ListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: ListResponse<Post> = yield call(postApi.getAll, params);
    yield put(postActions.fetchPostListSuccess(response));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(postActions.fetchPostListFailure());
  }
}

function* fetchSavedList(action: PayloadAction<ListParams>) {
  const params: ListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: ListResponse<Post> = yield call(postApi.getSavedList, params);
    yield put(postActions.fetchSavedListSuccess(response));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(postActions.fetchSavedFailure());
  }
}

function* fetchPostDetail(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.getBySlug, action.payload);
    yield put(postActions.fetchPostDetailSuccess(post));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(postActions.fetchPostDetailFailure());
  }
}

function* likePost(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.like, action.payload);
    yield put(postActions.likePostSuccess(post));
  } catch (error) {
    showErrorToastFromServer(error);
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.fetchPostList.type, fetchPostList);
  yield takeLatest(postActions.fetchSavedList.type, fetchSavedList);
  yield takeLatest(postActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(postActions.likePost.type, likePost);
}
