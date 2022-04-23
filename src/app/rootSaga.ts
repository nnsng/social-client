import authSaga from 'features/auth/authSaga';
import commentSaga from 'features/blog/commentSaga';
import blogSaga from 'features/blog/blogSaga';
import settingSaga from 'features/settings/settingSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), blogSaga(), commentSaga(), settingSaga()]);
}
