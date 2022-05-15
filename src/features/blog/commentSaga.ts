import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { commentActions } from './commentSlice';
import commentApi from 'api/commentApi';
import { IComment } from 'models';

function* fetchPostComments(action: PayloadAction<string>) {
  try {
    const postComment: IComment[] = yield call(commentApi.getPostComment, action.payload);
    yield put(commentActions.fetchPostCommentsSuccess(postComment));
  } catch (error) {
    yield put(commentActions.fetchPostCommentsFailure());
    console.log('Failed to fetch comments:', error);
  }
}

function* likeComment(action: PayloadAction<string>) {
  try {
    const comment: IComment = yield call(commentApi.like, action.payload);
    yield put(commentActions.likeSuccess(comment));
  } catch (error) {
    console.log('Failed to like comment:', error);
  }
}

export default function* commentSaga() {
  yield takeLatest(commentActions.fetchPostComments.type, fetchPostComments);
  yield takeLatest(commentActions.like.type, likeComment);
}
