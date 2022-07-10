import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ConfigKey, IUserConfig } from 'models';
import { localConfig } from 'utils/common';

const initialState: IUserConfig = {
  theme: 'light',
  color: '#FF652F',
  lang: 'vi',
  ...localConfig.get(),
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IUserConfig>>) {
      const config = action.payload;
      const keyList = Object.keys(config) as ConfigKey[];

      for (const key of keyList) {
        const value: any = config[key];
        state[key] = value;
        localConfig.update({ [key]: value });
      }
    },
  },
});

export const configActions = configSlice.actions;

export const selectThemeMode = (state: RootState) => state.config.theme;
export const selectThemeColor = (state: RootState) => state.config.color;
export const selectLanguage = (state: RootState) => state.config.lang;

const configReducer = configSlice.reducer;
export default configReducer;
