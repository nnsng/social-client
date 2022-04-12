import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedLanguage, UserConfig } from 'models';
import { localConfig } from 'utils/common';
import { RootState } from 'app/store';
import { SupportedThemeColor } from 'models/common';

export type ConfigKey = keyof UserConfig;

const initialState: UserConfig = {
  theme: 'light',
  color: '#7575FF',
  lang: 'vi',
  ...localConfig.get(),
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<PaletteMode>) {
      state.theme = action.payload;
      localConfig.setProperty('theme', action.payload);
    },
    changeThemeColor(state, action: PayloadAction<SupportedThemeColor>) {
      state.color = action.payload;
      localConfig.setProperty('color', action.payload);
    },
    changeLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.lang = action.payload;
      localConfig.setProperty('lang', action.payload);
    },
  },
});

export const configActions = configSlice.actions;

export const selectThemeMode = (state: RootState) => state.config.theme;
export const selectThemeColor = (state: RootState) => state.config.color;
export const selectLanguage = (state: RootState) => state.config.lang;

const configReducer = configSlice.reducer;
export default configReducer;
