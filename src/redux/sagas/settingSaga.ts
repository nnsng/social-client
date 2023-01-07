import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '~/api';
import { User } from '~/models';
import { userActions } from '~/redux/slices/userSlice';
import { showErrorToastFromServer, showToast } from '~/utils/toast';
import { settingActions } from '../slices/settingSlice';

function* updateProfile(action: PayloadAction<Partial<User>>) {
  try {
    const updatedUser: User = yield call(userApi.updateProfile, action.payload);

    yield put(userActions.setCurrentUser(updatedUser));

    showToast('user.update');
  } catch (error) {
    showErrorToastFromServer(error);
  }

  yield put(settingActions.updateProfileFinished());
}

export default function* settingSaga() {
  yield takeLatest(settingActions.updateProfile.type, updateProfile);
}
