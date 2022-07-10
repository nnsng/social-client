import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models';
import { RootState } from 'app/store';

export interface ISettingState {
  submitting: boolean;
}

const initialState: ISettingState = {
  submitting: false,
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<IUser>>) {
      state.submitting = true;
    },
    updateProfileFinished(state) {
      state.submitting = false;
    },
  },
});

export const settingActions = settingSlice.actions;

export const selectSettingSubmitting = (state: RootState) => state.settings.submitting;

const settingReducer = settingSlice.reducer;
export default settingReducer;
