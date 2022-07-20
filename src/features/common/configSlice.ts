import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { CONFIG } from 'utils/constants';

const localConfig = JSON.parse(localStorage.getItem(CONFIG) || '{}');

const initialState = {
  theme: 'light',
  color: '#FF652F',
  language: 'vi',
  ...localConfig,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    update(state, action: PayloadAction<object>) {
      const configEntries = Object.entries(action.payload);

      for (const [key, value] of configEntries) {
        state[key] = value;
      }
      localStorage.setItem(CONFIG, JSON.stringify(state));
    },
  },
});

export const configActions = configSlice.actions;

export const selectThemeMode = (state: RootState) => state.config.theme;
export const selectThemeColor = (state: RootState) => state.config.color;
export const selectLanguage = (state: RootState) => state.config.language;

const configReducer = configSlice.reducer;
export default configReducer;
