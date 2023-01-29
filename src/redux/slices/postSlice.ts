import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import {
  ListParams,
  ListResponse,
  PaginationParams,
  Post,
  SearchParams,
  SearchResultItem,
  User,
} from '~/models';

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
    fetchPostList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.list = [];
    },
    fetchPostListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchPostListFailure(state) {
      state.loading = false;
    },

    fetchSavedList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.list = [];
    },
    fetchSavedListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchSavedFailure(state) {
      state.loading = false;
    },

    fetchPostDetail(state, action: PayloadAction<string>) {
      state.loading = true;
      state.detail = null;
    },
    fetchPostDetailSuccess(state, action: PayloadAction<Post>) {
      state.loading = false;
      state.detail = action.payload;
    },
    fetchPostDetailFailure(state) {
      state.loading = false;
    },

    likePost(state, action: PayloadAction<string>) {},
    likePostSuccess(state, action: PayloadAction<Post>) {
      state.detail = action.payload;
    },

    updateCommentCount(state, action: PayloadAction<number>) {
      if (state.detail) state.detail.commentCount = action.payload;
    },
  },
});

export const postActions = postSlice.actions;

export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostList = (state: RootState) => state.post.list;
export const selectPostDetail = (state: RootState) => state.post.detail;
export const selectPostPagination = (state: RootState) => state.post.pagination;

export const selectTotalPages = createSelector(selectPostPagination, (pagination) =>
  pagination ? Math.ceil(pagination?.totalRows / pagination?.limit) : 1
);

const postReducer = postSlice.reducer;
export default postReducer;
