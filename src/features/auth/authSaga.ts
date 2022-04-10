import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { AuthFormValue, AuthPayload, AuthResponse } from 'models';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from 'utils/constants';
import { useTranslateFiles } from 'utils/translation';
import { authActions } from './authSlice';

function* handleLogin(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  const { toast: toastTranslation } = useTranslateFiles('toast');

  try {
    const response: AuthResponse = yield call(authApi.login, formValues as AuthFormValue);
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error: any) {
    const errorName = error?.response?.data?.name || 'somethingWrong';
    toast.error(toastTranslation.errors[errorName]);
  }
}

function* handleRegister(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  const { toast: toastTranslation } = useTranslateFiles('toast');

  try {
    yield call(authApi.register, formValues as AuthFormValue);
    navigate?.('/login', { replace: true });
    toast.info('Please check your email to active your account!');
  } catch (error: any) {
    const errorName = error?.response?.data?.name || 'somethingWrong';
    toast.error(toastTranslation.errors[errorName]);
  }
}

function* handleGoogleLogin(action: PayloadAction<AuthPayload>) {
  const { token, navigate } = action.payload;

  const { toast: toastTranslation } = useTranslateFiles('toast');

  try {
    const response: AuthResponse = yield call(authApi.googleLogin, token as string);
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error: any) {
    const errorName = error?.response?.data?.name || 'somethingWrong';
    toast.error(toastTranslation.errors[errorName]);
  }
}

function* handleActiveAccount(action: PayloadAction<AuthPayload>) {
  const { token, navigate } = action.payload;

  const { toast: toastTranslation } = useTranslateFiles('toast');

  try {
    const response: AuthResponse = yield call(authApi.active, token || '');
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
    toast.success(toastTranslation.auth.activeSuccess);
  } catch (error: any) {
    const errorName = error?.response?.data?.name || 'somethingWrong';
    toast.error(toastTranslation.errors[errorName]);
  }
}

function* handleLogout(action: PayloadAction<AuthPayload>) {
  const { navigate } = action.payload;

  yield delay(500);
  localStorage.removeItem(ACCESS_TOKEN);
  navigate?.('/login');
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.register.type, handleRegister);
  yield takeLatest(authActions.googleLogin.type, handleGoogleLogin);
  yield takeLatest(authActions.activeAccount.type, handleActiveAccount);
  yield takeLatest(authActions.logout.type, handleLogout);
}
