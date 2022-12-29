import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { commentApi } from '~/api';
import { Comment } from '~/models';
import { showErrorToastFromServer } from '~/utils/toast';
import { commentActions } from '../slices/commentSlice';

function* fetchPostComments(action: PayloadAction<string>) {
  try {
    const postComment: Comment[] = yield call(commentApi.getPostComment, action.payload);
    yield put(commentActions.fetchPostCommentsSuccess(postComment));
  } catch (error) {
    showErrorToastFromServer(error);
    yield put(commentActions.fetchPostCommentsFailure());
  }
}

function* likeComment(action: PayloadAction<string>) {
  try {
    const comment: Comment = yield call(commentApi.like, action.payload);
    yield put(commentActions.likeSuccess(comment));
  } catch (error) {
    showErrorToastFromServer(error);
  }
}

export default function* commentSaga() {
  yield takeLatest(commentActions.fetchPostComments.type, fetchPostComments);
  yield takeLatest(commentActions.like.type, likeComment);
}
