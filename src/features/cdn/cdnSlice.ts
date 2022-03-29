import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

const cdnSlice = createSlice({
  name: 'cdn',
  initialState: {
    loading: false,
  },
  reducers: {
    startGetImageUrl: (state) => {
      state.loading = true;
    },
    getImageUrlFinished: (state) => {
      state.loading = false;
    },
  },
});

export const cdnActions = cdnSlice.actions;

export const selectCdnLoading = (state: RootState) => state.cdn.loading;

const cdnReducer = cdnSlice.reducer;
export default cdnReducer;
