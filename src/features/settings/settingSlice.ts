import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';
import { RootState } from 'app/store';

export interface SettingState {
  submitting: boolean;
}

const initialState: SettingState = {
  submitting: false,
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<User>) {
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
