import { all } from 'redux-saga/effects';
import { commentSaga, postSaga, commonSaga, settingSaga, userSaga } from '~/redux/sagas';

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), commentSaga(), settingSaga(), commonSaga()]);
}
