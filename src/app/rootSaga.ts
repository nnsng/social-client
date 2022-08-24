import userSaga from 'features/auth/userSaga';
import blogSaga from 'features/blog/blogSaga';
import commentSaga from 'features/blog/commentSaga';
import settingSaga from 'features/settings/settingSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([userSaga(), blogSaga(), commentSaga(), settingSaga()]);
}
