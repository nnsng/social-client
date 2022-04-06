import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthPayload, User } from 'models';

export interface AuthState {
  currentUser: User | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<AuthPayload>) {},

    login(state, action: PayloadAction<AuthPayload>) {},

    activeAccount(state, action: PayloadAction<AuthPayload>) {},

    googleLogin(state, action: PayloadAction<AuthPayload>) {},

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

const authReducer = authSlice.reducer;
export default authReducer;
