import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import postApi from 'api/postApi';
import { ListParams, ListResponse, Post } from 'models';
import { blogActions } from './blogSlice';

function* fetchPostList(action: PayloadAction<ListParams>) {
  const params: ListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: ListResponse<Post> = yield call(postApi.getAll, params);
    yield put(blogActions.fetchPostListSuccess(response));
  } catch (error) {
    yield put(blogActions.fetchPostListFailure());
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
    yield put(blogActions.fetchMyPostListSuccess(response));
  } catch (error) {
    yield put(blogActions.fetchMyPostListFailure());
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
    yield put(blogActions.fetchSavedPostListSuccess(response));
  } catch (error) {
    yield put(blogActions.fetchSavedPostListFailure());
    console.log('Failed to fetch saved post list:', error);
  }
}

function* fetchPostDetail(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.getBySlug, action.payload);
    yield put(blogActions.fetchPostDetailSuccess(post));
  } catch (error) {
    yield put(blogActions.fetchPostDetailFailure());
    console.log('Failed to fetch post detail:', error);
  }
}

function* likePost(action: PayloadAction<string>) {
  try {
    const post: Post = yield call(postApi.like, action.payload);
    yield put(blogActions.likePostSuccess(post));
  } catch (error) {
    console.log('Failed to like post:', error);
  }
}

function* handleSearchWithDebounce(action: PayloadAction<string>) {
  try {
    if (action.payload.length > 1) {
      const response: Post[] = yield call(postApi.searchPosts, action.payload);
      yield put(blogActions.searchWithDebounceSuccess(response));
    } else {
      yield put(blogActions.searchWithDebounceSuccess([]));
    }
  } catch (error) {
    console.log('Failed to fetch post list with search debounce:', error);
    yield put(blogActions.searchWithDebounceFailure());
  }
}

export default function* postSaga() {
  yield takeLatest(blogActions.fetchPostList.type, fetchPostList);
  yield takeLatest(blogActions.fetchMyPostList.type, fetchMyPostList);
  yield takeLatest(blogActions.fetchSavedPostList.type, fetchSavedPostList);
  yield takeLatest(blogActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(blogActions.likePost.type, likePost);

  yield debounce(500, blogActions.searchWithDebounce.type, handleSearchWithDebounce);
}
