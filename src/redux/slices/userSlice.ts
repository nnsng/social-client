import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { RootState } from '~/app/store';
import { CONFIG } from '~/constants';
import {
  AuthPayload,
  GoogleAuthPayload,
  LoginFormValues,
  RegisterFormValues,
  User,
  UserConfig,
  UserConfigKey,
} from '~/models';

interface UserState {
  submitting: boolean;
  currentUser: User | null;
  config: UserConfig;
}

const localConfig = JSON.parse(localStorage.getItem(CONFIG) || '{}');

const initialState: UserState = {
  submitting: false,
  currentUser: null,
  config: {
    mode: 'light',
    mainColor: '#FF652F',
    language: 'en',
    ...localConfig,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<AuthPayload<RegisterFormValues>>) {},

    login(state, action: PayloadAction<AuthPayload<LoginFormValues>>) {},

    googleLogin(state, action: PayloadAction<GoogleAuthPayload>) {},

    logout(state, action: PayloadAction<NavigateFunction>) {
      state.currentUser = null;
    },

    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },

    updateCurrentUser(state, action: PayloadAction<Partial<User>>) {
      state.currentUser = { ...state.currentUser, ...action.payload } as User;
    },

    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },

    updateConfig(state, action: PayloadAction<{ name: UserConfigKey; value: any }>) {
      const { name, value } = action.payload;
      state.config[name] = value;
      localStorage.setItem(CONFIG, JSON.stringify(state.config));
    },
  },
});

export const userActions = userSlice.actions;

export const selectAuthSubmitting = (state: RootState) => state.user.submitting;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserConfig = (state: RootState) => state.user.config;

const userReducer = userSlice.reducer;
export default userReducer;
