import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { chatActions } from 'features/chat/chatSlice';
import { IAuthFormValues, IAuthPayload, IAuthResponse } from 'models';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from 'utils/constants';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import { authActions } from './authSlice';

function* handleLogin(action: PayloadAction<IAuthPayload>) {
  const { formValues, navigate } = action.payload;

  yield put(authActions.setSubmitting(true));
  try {
    const response: IAuthResponse = yield call(authApi.login, formValues as IAuthFormValues);
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToast(error);
  }
  yield put(authActions.setSubmitting(false));
}

function* handleRegister(action: PayloadAction<IAuthPayload>) {
  const { formValues, navigate } = action.payload;

  const { toast: toastTranslation } = translateFiles('toast');

  yield put(authActions.setSubmitting(true));
  try {
    yield call(authApi.register, formValues as IAuthFormValues);
    navigate?.('/login', { replace: true });
    toast.info(toastTranslation.auth.activeAccount);
  } catch (error) {
    showErrorToast(error);
  }
  yield put(authActions.setSubmitting(false));
}

function* handleGoogleLogin(action: PayloadAction<IAuthPayload>) {
  const { token, navigate } = action.payload;

  yield put(authActions.setSubmitting(true));
  try {
    const response: IAuthResponse = yield call(authApi.googleLogin, token as string);
    if (response.activeToken) {
      navigate?.(`/create-password?token=${response.activeToken}`);
      return;
    }
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToast(error);
  }
  yield put(authActions.setSubmitting(false));
}

function* handleLogout(action: PayloadAction<IAuthPayload>) {
  const { navigate } = action.payload;

  yield delay(500);
  yield put(chatActions.reset());
  localStorage.removeItem(ACCESS_TOKEN);
  navigate?.('/login');
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.register.type, handleRegister);
  yield takeLatest(authActions.googleLogin.type, handleGoogleLogin);
  yield takeLatest(authActions.logout.type, handleLogout);
}
