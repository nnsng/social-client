import userSaga from 'features/auth/userSaga';
import postSaga from 'features/blog/postSaga';
import commentSaga from 'features/blog/commentSaga';
import settingSaga from 'features/settings/settingSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), commentSaga(), settingSaga()]);
}
