import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { chatActions } from 'features/chat/chatSlice';
import { AuthFormValues, AuthPayload, AuthResponse } from 'models';
import { toast } from 'react-toastify';
import { LocalStorageKey } from 'utils/constants';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import { userActions } from './userSlice';

function* handleLogin(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  yield put(userActions.setSubmitting(true));
  try {
    const response: AuthResponse = yield call(authApi.login, formValues as AuthFormValues);
    yield put(userActions.setCurrentUser(response.user));
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToast(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleRegister(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  const { toast: toastTranslation } = translateFiles('toast');

  yield put(userActions.setSubmitting(true));
  try {
    yield call(authApi.register, formValues as AuthFormValues);
    navigate?.('/login', { replace: true });
    toast.info(toastTranslation.auth.activeAccount);
  } catch (error) {
    showErrorToast(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleGoogleLogin(action: PayloadAction<AuthPayload>) {
  const { token, navigate } = action.payload;

  yield put(userActions.setSubmitting(true));
  try {
    const response: AuthResponse = yield call(authApi.googleLogin, token as string);
    if (response.activeToken) {
      navigate?.(`/create-password?token=${response.activeToken}`);
      return;
    }
    yield put(userActions.setCurrentUser(response.user));
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToast(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleLogout(action: PayloadAction<AuthPayload>) {
  const { navigate } = action.payload;

  yield delay(500);
  yield put(chatActions.reset());
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  navigate?.('/login');
}

export default function* authSaga() {
  yield takeLatest(userActions.login.type, handleLogin);
  yield takeLatest(userActions.register.type, handleRegister);
  yield takeLatest(userActions.googleLogin.type, handleGoogleLogin);
  yield takeLatest(userActions.logout.type, handleLogout);
}
