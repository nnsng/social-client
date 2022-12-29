import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '~/api';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '~/constants';
import {
  AuthPayload,
  AuthResponse,
  GoogleAuthPayload,
  LoginFormValues,
  RegisterFormValues,
} from '~/models';
import { showErrorToastFromServer } from '~/utils/toast';
import { translateFiles } from '~/utils/translation';
import { userActions } from '../slices/userSlice';

function* handleLogin(action: PayloadAction<AuthPayload<LoginFormValues>>) {
  const { formValues, navigate } = action.payload;
  if (!formValues) return;

  yield put(userActions.setSubmitting(true));
  try {
    const response: AuthResponse = yield call(authApi.login, formValues);
    yield put(userActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToastFromServer(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleRegister(action: PayloadAction<AuthPayload<RegisterFormValues>>) {
  const { formValues, navigate } = action.payload;
  if (!formValues) return;

  const { toast: toastTranslation } = translateFiles('toast');

  yield put(userActions.setSubmitting(true));
  try {
    yield call(authApi.register, formValues);
    navigate?.('/login', { replace: true });
    toast.info(toastTranslation.auth.activeAccount);
  } catch (error) {
    showErrorToastFromServer(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleGoogleLogin(action: PayloadAction<GoogleAuthPayload>) {
  const { token, navigate } = action.payload;

  yield put(userActions.setSubmitting(true));
  try {
    const response: AuthResponse = yield call(authApi.googleLogin, token);
    if (response.activeToken) {
      navigate?.(`/create-password?token=${response.activeToken}`);
      return;
    }
    yield put(userActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error) {
    showErrorToastFromServer(error);
  }
  yield put(userActions.setSubmitting(false));
}

function* handleLogout(action: PayloadAction<NavigateFunction>) {
  const navigate = action.payload;

  yield delay(500);
  localStorage.removeItem(ACCESS_TOKEN);
  navigate?.('/login');
}

export default function* authSaga() {
  yield takeLatest(userActions.login.type, handleLogin);
  yield takeLatest(userActions.register.type, handleRegister);
  yield takeLatest(userActions.googleLogin.type, handleGoogleLogin);
  yield takeLatest(userActions.logout.type, handleLogout);
}
