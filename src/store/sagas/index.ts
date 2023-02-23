import { all } from 'redux-saga/effects';
import commentSaga from './commentSaga';
import postSaga from './postSaga';
import settingSaga from './settingSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), commentSaga(), settingSaga()]);
}
