import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IAuthPayload, IResetPasswordFormValues, IUser } from 'models';

export interface IAuthState {
  currentUser: IUser | null;
}

const initialState: IAuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action: PayloadAction<IAuthPayload>) {},

    login(state, action: PayloadAction<IAuthPayload>) {},

    googleLogin(state, action: PayloadAction<IAuthPayload>) {},

    activeAccount(state, action: PayloadAction<IAuthPayload>) {},

    logout(state, action: PayloadAction<IAuthPayload>) {
      state.currentUser = null;
    },

    setCurrentUser(state, action: PayloadAction<IUser>) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

const authReducer = authSlice.reducer;
export default authReducer;
