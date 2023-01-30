import { all } from 'redux-saga/effects';
import { commentSaga, otherSaga, postSaga, settingSaga, userSaga } from '~/redux/sagas';

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), commentSaga(), settingSaga(), otherSaga()]);
}
