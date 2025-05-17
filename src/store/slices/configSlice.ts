import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  sidebar: {
    open: boolean;
  };
}

const initialState: ConfigState = {
  sidebar: {
    open: false,
  },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean | undefined>) {
      state.sidebar.open = action?.payload ?? !state.sidebar.open;
    },
  },
});

export const configActions = configSlice.actions;

export const selectOpenSidebar = (state: RootState) => state.config.sidebar.open;

const configReducer = configSlice.reducer;
export default configReducer;
