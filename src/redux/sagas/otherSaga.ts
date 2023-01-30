import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { otherApi } from '~/api';
import { Post, SearchParams, User } from '~/models';
import { showErrorToastFromServer } from '~/utils/toast';
import { otherActions } from '../slices/otherSlice';

function* searchWithDebounce(action: PayloadAction<SearchParams>) {
  const params = action.payload;

  try {
    if (params.q.length === 0) {
      yield put(otherActions.searchWithDebounceSuccess([]));
      return;
    }

    const response: Post[] | Partial<User>[] = yield call(otherApi.search, params);

    yield put(otherActions.searchWithDebounceSuccess(response));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(otherActions.searchWithDebounceFailure());
  }
}

export default function* otherSaga() {
  yield takeLatest(otherActions.searchWithDebounce.type, searchWithDebounce);
}
