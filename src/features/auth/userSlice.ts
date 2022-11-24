import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LocalStorageKey } from 'constants/common';
import { AuthPayload, User, UserConfig, UserConfigKey } from 'models';

export interface UserState {
  submitting: boolean;
  currentUser: User | null;
  config: UserConfig;
}

const localConfig = JSON.parse(localStorage.getItem(LocalStorageKey.CONFIG) || '{}');

const initialState: UserState = {
  submitting: false,
  currentUser: null,
  config: {
    mode: 'light',
    mainColor: '#FF652F',
    language: 'vi',
    ...localConfig,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<AuthPayload>) {},

    login(state, action: PayloadAction<AuthPayload>) {},

    googleLogin(state, action: PayloadAction<AuthPayload>) {},

    logout(state, action: PayloadAction<AuthPayload>) {
      state.currentUser = null;
    },

    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },

    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },

    updateConfig(state, action: PayloadAction<{ name: UserConfigKey; value: any }>) {
      const { name, value } = action.payload;
      state.config[name] = value;
      localStorage.setItem(LocalStorageKey.CONFIG, JSON.stringify(state.config));
    },
  },
});

export const userActions = userSlice.actions;

export const selectAuthSubmitting = (state: RootState) => state.user.submitting;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserConfig = (state: RootState) => state.user.config;

const userReducer = userSlice.reducer;
export default userReducer;
