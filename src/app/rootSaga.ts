import authSaga from 'features/auth/authSaga';
import commentSaga from 'features/comment/commentSaga';
import blogSaga from 'features/blog/blogSaga';
import settingSaga from 'features/setting/settingSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), blogSaga(), commentSaga(), settingSaga()]);
}
