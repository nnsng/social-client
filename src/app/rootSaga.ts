import authSaga from 'features/auth/authSaga';
import commentSaga from 'features/comment/commentSaga';
import postSaga from 'features/post/postSaga';
import settingSaga from 'features/setting/settingSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), postSaga(), commentSaga(), settingSaga()]);
}
