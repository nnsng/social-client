import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postApi } from '~/api';
import { ListParams, PaginationParams, Post } from '~/models';

const defaultParams = { page: 1, limit: 10 };

export const fetchPostList = createAsyncThunk(
  'post/fetchPostList',
  async (params: ListParams, { rejectWithValue }) => {
    try {
      const newParams = { ...defaultParams, ...params };
      return await postApi.fetchPostList(newParams);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSavedList = createAsyncThunk(
  'post/fetchSavedList',
  async (params: ListParams, { rejectWithValue }) => {
    try {
      const newParams = { ...defaultParams, ...params };
      return await postApi.fetchSavedList(newParams);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPostDetail = createAsyncThunk(
  'post/fetchPostDetail',
  async (slug: string, { rejectWithValue }) => {
    try {
      return await postApi.getBySlug(slug);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface PostState {
  loading: boolean;
  list: Post[];
  pagination: PaginationParams | null;
  detail: Post | null;
}

const initialState: PostState = {
  loading: false,
  list: [],
  pagination: null,
  detail: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePostDetail(state, action: PayloadAction<Partial<Post>>) {
      if (state.detail) {
        state.detail = { ...state.detail, ...action.payload };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.loading = true;
        state.list = [];
        state.pagination = null;
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPostList.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(fetchSavedList.pending, (state) => {
        state.loading = true;
        state.list = [];
        state.pagination = null;
      })
      .addCase(fetchSavedList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSavedList.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.detail = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const postActions = postSlice.actions;

const postReducer = postSlice.reducer;
export default postReducer;
