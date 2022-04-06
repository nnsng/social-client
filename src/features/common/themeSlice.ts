import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalConfig, setLocalConfig } from 'utils/common';
import { THEME } from 'utils/constants';
import { RootState } from './../../app/store';

export interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: getLocalConfig(THEME) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<PaletteMode>) {
      const themeMode = action.payload;
      state.mode = themeMode;
      setLocalConfig(THEME, themeMode);
    },
  },
});

export const themeActions = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.theme.mode;

const themeReducer = themeSlice.reducer;
export default themeReducer;
