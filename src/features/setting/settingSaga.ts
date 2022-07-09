import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'api';
import { authActions } from 'features/auth/authSlice';
import { IUser } from 'models';
import { toast } from 'react-toastify';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import { settingActions } from './settingSlice';

function* updateProfile(action: PayloadAction<Partial<IUser>>) {
  const { toast: toastTranslation } = translateFiles('toast');

  try {
    const updatedUser: IUser = yield call(userApi.updateProfile, action.payload);

    yield put(authActions.setCurrentUser(updatedUser));

    toast.success(toastTranslation.settingSaga.updateProfileSuccess);
  } catch (error) {
    showErrorToast(error);
  }

  yield put(settingActions.updateProfileFinished());
}

export default function* settingSaga() {
  yield takeLatest(settingActions.updateProfile.type, updateProfile);
}
