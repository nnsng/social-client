import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthFormValue, User } from 'models';
import { NavigateFunction } from 'react-router-dom';

export interface AuthPayload {
  formValues?: AuthFormValue;
  tokenId?: string;
  navigate?: NavigateFunction;
}

export interface AuthState {
  logging: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  logging: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<AuthPayload>) {
      state.logging = true;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    registerFailure(state) {
      state.logging = false;
    },

    login(state, action: PayloadAction<AuthPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailure(state) {
      state.logging = false;
    },

    googleLogin(state, action: PayloadAction<AuthPayload>) {
      state.logging = true;
    },
    googleLoginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
    },
    googleLoginFailure(state) {
      state.logging = false;
    },

    logout(state, action: PayloadAction<AuthPayload>) {
      state.currentUser = null;
    },

    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectLogging = (state: RootState) => state.auth.logging;

const authReducer = authSlice.reducer;
export default authReducer;
