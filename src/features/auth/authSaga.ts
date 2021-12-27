import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { ACCESS_TOKEN } from 'constants/common';
import { AuthFormValue, AuthResponse } from 'models';
import { toast } from 'react-toastify';
import { authActions, AuthPayload } from './authSlice';

function* handleLogin(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  try {
    const response: AuthResponse = yield call(authApi.login, formValues as AuthFormValue);

    yield put(authActions.loginSuccess(response.user));

    localStorage.setItem(ACCESS_TOKEN, response.token);

    navigate?.('/', { replace: true });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    yield put(authActions.loginFailure());
  }
}

function* handleRegister(action: PayloadAction<AuthPayload>) {
  const { formValues, navigate } = action.payload;

  try {
    yield call(authApi.register, formValues as AuthFormValue);

    navigate?.('/login', { replace: true });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
}

function* handleGoogleLogin(action: PayloadAction<AuthPayload>) {
  const { tokenId, navigate } = action.payload;
  try {
    const response: AuthResponse = yield call(authApi.googleLogin, tokenId as string);
    yield put(authActions.googleLoginSuccess(response.user));

    localStorage.setItem(ACCESS_TOKEN, response.token);

    navigate?.('/', { replace: true });
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    yield put(authActions.googleLoginFailure());
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

  yield takeLatest(authActions.logout.type, handleLogout);
}
