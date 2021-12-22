import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { authActions } from 'features/auth/authSlice';
import { User } from 'models';
import { toast } from 'react-toastify';
import { settingActions } from './settingSlice';

function* updateProfile(action: PayloadAction<User>) {
  try {
    const updatedUser: User = yield call(authApi.updateProfile, action.payload);

    yield put(authActions.setCurrentUser(updatedUser));

    toast.success('Cập nhật thông tin thành công');
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }

  yield put(settingActions.updateProfileFinished());
}

export default function* settingSaga() {
  yield takeLatest(settingActions.updateProfile.type, updateProfile);
}
