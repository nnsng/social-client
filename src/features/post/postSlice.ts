import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Post } from 'models';

export interface PostState {
  loading: boolean;
  list: Post[];
  pagination: PaginationParams | null;
  detail: Post | null;

  searchResultList: Post[];
  searchLoading: boolean;
}

const initialState: PostState = {
  loading: false,
  list: [],
  pagination: null,
  detail: null,

  searchResultList: [],
  searchLoading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchPostListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchPostListFailure(state) {
      state.loading = false;
    },

    fetchMyPostList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.list = [];
    },
    fetchMyPostListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchMyPostListFailure(state) {
      state.loading = false;
    },

    fetchSavedPostList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
      state.list = [];
    },
    fetchSavedPostListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchSavedPostListFailure(state) {
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
    likePostFailure(state) {},

    updateCommentCount(state, action: PayloadAction<number>) {
      if (state.detail) {
        state.detail.commentCount = action.payload;
      }
    },

    searchWithDebounce(state, action: PayloadAction<string>) {
      state.searchLoading = true;
      state.searchResultList = [];
    },
    searchWithDebounceSuccess(state, action: PayloadAction<Post[]>) {
      state.searchLoading = false;
      state.searchResultList = action.payload;
    },
    searchWithDebounceFailure(state) {
      state.searchLoading = false;
    },
  },
});

export const postActions = postSlice.actions;

export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostList = (state: RootState) => state.post.list;
export const selectPostDetail = (state: RootState) => state.post.detail;
export const selectPostPagination = (state: RootState) => state.post.pagination;

export const selectSearchResultList = (state: RootState) => state.post.searchResultList;
export const selectSearchLoading = (state: RootState) => state.post.searchLoading;

export const selectTotalPages = createSelector(selectPostPagination, (pagination) =>
  pagination ? Math.ceil(pagination?.totalRows / pagination?.limit) : 1
);

const postReducer = postSlice.reducer;
export default postReducer;
