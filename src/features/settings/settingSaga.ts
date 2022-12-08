import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'api';
import { userActions } from '~/features/auth/userSlice';
import { User } from '~/models';
import { toast } from 'react-toastify';
import { showErrorToastFromServer } from '~/utils/toast';
import { translateFiles } from '~/utils/translation';
import { settingActions } from './settingSlice';

function* updateProfile(action: PayloadAction<Partial<User>>) {
  const { toast: toastTranslation } = translateFiles('toast');

  try {
    const updatedUser: User = yield call(userApi.updateProfile, action.payload);

    yield put(userActions.setCurrentUser(updatedUser));

    toast.success(toastTranslation.settingSaga.updateProfileSuccess);
  } catch (error) {
    showErrorToastFromServer(error);
  }

  yield put(settingActions.updateProfileFinished());
}

export default function* settingSaga() {
  yield takeLatest(settingActions.updateProfile.type, updateProfile);
}
