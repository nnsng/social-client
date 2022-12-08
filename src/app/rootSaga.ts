import { all } from 'redux-saga/effects';
import userSaga from '~/features/auth/userSaga';
import commentSaga from '~/features/blog/commentSaga';
import postSaga from '~/features/blog/postSaga';
import settingSaga from '~/features/settings/settingSaga';

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), commentSaga(), settingSaga()]);
}
