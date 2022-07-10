import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { postApi, userApi } from 'api';
import { IListParams, IListResponse, IPost, ISearchObj, IUser } from 'models';
import { showErrorToast } from 'utils/toast';
import { blogActions } from './blogSlice';

function* fetchPostList(action: PayloadAction<IListParams>) {
  const params: IListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: IListResponse<IPost> = yield call(postApi.getAll, params);
    yield put(blogActions.fetchPostListSuccess(response));
  } catch (error) {
    showErrorToast(error);
    yield put(blogActions.fetchPostListFailure());
  }
}

function* fetchSavedList(action: PayloadAction<IListParams>) {
  const params: IListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: IListResponse<IPost> = yield call(postApi.getSavedList, params);
    yield put(blogActions.fetchSavedListSuccess(response));
  } catch (error) {
    showErrorToast(error);
    yield put(blogActions.fetchSavedFailure());
  }
}

function* fetchPostDetail(action: PayloadAction<string>) {
  try {
    const post: IPost = yield call(postApi.getBySlug, action.payload);
    yield put(blogActions.fetchPostDetailSuccess(post));
  } catch (error) {
    showErrorToast(error);
    yield put(blogActions.fetchPostDetailFailure());
  }
}

function* handleLikePost(action: PayloadAction<string>) {
  try {
    const post: IPost = yield call(postApi.like, action.payload);
    yield put(blogActions.likePostSuccess(post));
  } catch (error) {
    showErrorToast(error);
  }
}

function* handleSearchWithDebounce(action: PayloadAction<ISearchObj>) {
  const searchObj = action.payload;

  try {
    if (searchObj.searchTerm.length === 0) {
      yield put(blogActions.searchWithDebounceSuccess([]));
      return;
    }

    let response: IPost[] | Partial<IUser>[] = [];
    if (searchObj.searchFor === 'username') {
      response = yield call(userApi.search, searchObj.searchTerm);
    } else {
      response = yield call(postApi.search, searchObj);
    }
    yield put(blogActions.searchWithDebounceSuccess(response));
  } catch (error) {
    showErrorToast(error);
    yield put(blogActions.searchWithDebounceFailure());
  }
}

export default function* postSaga() {
  yield takeLatest(blogActions.fetchPostList.type, fetchPostList);
  yield takeLatest(blogActions.fetchSavedList.type, fetchSavedList);
  yield takeLatest(blogActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(blogActions.likePost.type, handleLikePost);

  yield debounce(500, blogActions.searchWithDebounce.type, handleSearchWithDebounce);
}
