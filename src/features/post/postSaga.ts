import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import postApi from 'api/postApi';
import { ListParams, ListResponse, Post } from 'models';
import { postActions } from './postSlice';

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
    yield put(postActions.fetchPostListFailure());
    console.log('Failed to fetch post list:', error);
  }
}

function* fetchMyPostList(action: PayloadAction<ListParams>) {
  const params: ListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: ListResponse<Post> = yield call(postApi.getMyPosts, params);
    yield put(postActions.fetchMyPostListSuccess(response));
  } catch (error) {
    yield put(postActions.fetchMyPostListFailure());
    console.log('Failed to fetch my post list:', error);
  }
}

function* fetchSavedPostList(action: PayloadAction<ListParams>) {
  const params: ListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: ListResponse<Post> = yield call(postApi.getSavedPosts, params);
    yield put(postActions.fetchSavedPostListSuccess(response));
  } catch (error) {
    yield put(postActions.fetchSavedPostListFailure());
    console.log('Failed to fetch saved post list:', error);
  }
}

function* fetchPostDetail(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.getBySlug, action.payload);
    yield put(postActions.fetchPostDetailSuccess(post));
  } catch (error) {
    yield put(postActions.fetchPostDetailFailure());
    console.log('Failed to fetch post detail:', error);
  }
}

function* likePost(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.like, action.payload);
    yield put(postActions.likePostSuccess(post));
  } catch (error) {
    yield put(postActions.likePostFailure());
    console.log('Failed to like post:', error);
  }
}

function* handleSearchWithDebounce(action: PayloadAction<string>) {
  try {
    if (action.payload.length > 1) {
      const response: Post[] = yield call(postApi.searchPosts, action.payload);
      yield put(postActions.searchWithDebounceSuccess(response));
    } else {
      yield put(postActions.searchWithDebounceSuccess([]));
    }
  } catch (error) {
    console.log('Failed to fetch post list with search debounce:', error);
    yield put(postActions.searchWithDebounceFailure());
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.fetchPostList.type, fetchPostList);
  yield takeLatest(postActions.fetchMyPostList.type, fetchMyPostList);
  yield takeLatest(postActions.fetchSavedPostList.type, fetchSavedPostList);
  yield takeLatest(postActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(postActions.likePost.type, likePost);

  yield debounce(500, postActions.searchWithDebounce.type, handleSearchWithDebounce);
}
