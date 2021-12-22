import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

const cdnSlice = createSlice({
  name: 'cdn',
  initialState: {
    loading: false,
  },
  reducers: {
    fetchImageUrl: (state) => {
      state.loading = true;
    },
    fetchImageUrlFinished: (state) => {
      state.loading = false;
    },
  },
});

export const cdnActions = cdnSlice.actions;

export const selectCdnLoading = (state: RootState) => state.cdn.loading;

const cdnReducer = cdnSlice.reducer;
export default cdnReducer;
