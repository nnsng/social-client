import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { postApi, userApi } from '~/api';
import { ListParams, ListResponse, Post, SearchObj, User } from '~/models';
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

function* handleLikePost(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.like, action.payload);
    yield put(postActions.likePostSuccess(post));
  } catch (error) {
    showErrorToastFromServer(error);
  }
}

function* handleSearchWithDebounce(action: PayloadAction<SearchObj>) {
  const searchObj = action.payload;

  try {
    if (searchObj.searchTerm.length === 0) {
      yield put(postActions.searchWithDebounceSuccess([]));
      return;
    }

    let response: Post[] | Partial<User>[] = [];
    if (searchObj.searchFor === 'username') {
      response = yield call(userApi.search, searchObj.searchTerm);
    } else {
      response = yield call(postApi.search, searchObj);
    }
    yield put(postActions.searchWithDebounceSuccess(response));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(postActions.searchWithDebounceFailure());
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.fetchPostList.type, fetchPostList);
  yield takeLatest(postActions.fetchSavedList.type, fetchSavedList);
  yield takeLatest(postActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(postActions.likePost.type, handleLikePost);

  yield debounce(500, postActions.searchWithDebounce.type, handleSearchWithDebounce);
}
