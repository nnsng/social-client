import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { AuthFormValue, AuthPayload, AuthResponse } from 'models';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from './../../utils/constants';
import { authActions } from './authSlice';

function* handleLogin(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  try {
    const response: AuthResponse = yield call(authApi.login, formValues as AuthFormValue);
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* handleRegister(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  try {
    yield call(authApi.register, formValues as AuthFormValue);
    navigate?.('/login', { replace: true });
    toast.info('Please check your email to active your account!');
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* handleActiveAccount(action: PayloadAction<AuthPayload>) {
  const { token, navigate } = action.payload;

  try {
    const response: AuthResponse = yield call(authApi.active, token || '');
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
    toast.success('Your account has been activated!');
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* handleGoogleLogin(action: PayloadAction<AuthPayload>) {
  const { token, navigate } = action.payload;

  try {
    const response: AuthResponse = yield call(authApi.googleLogin, token as string);
    yield put(authActions.setCurrentUser(response.user));
    localStorage.setItem(ACCESS_TOKEN, response.token);
    navigate?.('/', { replace: true });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
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
  yield takeLatest(authActions.activeAccount.type, handleActiveAccount);
  yield takeLatest(authActions.googleLogin.type, handleGoogleLogin);
  yield takeLatest(authActions.logout.type, handleLogout);
}
