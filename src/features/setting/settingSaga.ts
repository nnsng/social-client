import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { authActions } from 'features/auth/authSlice';
import { User } from 'models';
import { toast } from 'react-toastify';
import { useTranslateFiles } from 'utils/translation';
import { settingActions } from './settingSlice';

function* updateProfile(action: PayloadAction<User>) {
  const { toast: toastTranslation } = useTranslateFiles('toast');

  try {
    const updatedUser: User = yield call(authApi.updateProfile, action.payload);

    yield put(authActions.setCurrentUser(updatedUser));

    toast.success(toastTranslation.settingSaga.updateProfileSuccess);
  } catch (error: any) {
    const errorName = error?.response?.data?.name || 'somethingWrong';
    toast.error(toastTranslation.errors[errorName]);
  }

  yield put(settingActions.updateProfileFinished());
}

export default function* settingSaga() {
  yield takeLatest(settingActions.updateProfile.type, updateProfile);
}
