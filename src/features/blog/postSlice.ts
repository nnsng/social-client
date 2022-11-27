import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  ListParams,
  ListResponse,
  PaginationParams,
  Post,
  SearchObj,
  SearchResultItem,
  User,
} from 'models';

export interface PostState {
  loading: boolean;
  list: Post[];
  saved: Post[];
  pagination: PaginationParams | null;
  detail: Post | null;

  searchResult: Post[] | Partial<User>[];
  searchLoading: boolean;
}

const initialState: PostState = {
  loading: false,
  list: [],
  saved: [],
  pagination: null,
  detail: null,

  searchResult: [],
  searchLoading: false,
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
      state.saved = [];
    },
    fetchSavedListSuccess(state, action: PayloadAction<ListResponse<Post>>) {
      state.loading = false;
      state.saved = action.payload.data;
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

    searchWithDebounce(state, action: PayloadAction<SearchObj>) {
      state.searchLoading = true;
      state.searchResult = [];
    },
    searchWithDebounceSuccess(state, action: PayloadAction<Post[] | Partial<User>[]>) {
      state.searchLoading = false;
      state.searchResult = action.payload;
    },
    searchWithDebounceFailure(state) {
      state.searchLoading = false;
    },
  },
});

export const postActions = postSlice.actions;

export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostList = (state: RootState) => state.post.list;
export const selectSavedList = (state: RootState) => state.post.saved;
export const selectPostDetail = (state: RootState) => state.post.detail;
export const selectPostPagination = (state: RootState) => state.post.pagination;

export const selectSearchResult = (state: RootState) => state.post.searchResult;
export const selectSearchLoading = (state: RootState) => state.post.searchLoading;

export const selectTotalPages = createSelector(selectPostPagination, (pagination) =>
  pagination ? Math.ceil(pagination?.totalRows / pagination?.limit) : 1
);

export const selectFormattedSearchResult = createSelector(selectSearchResult, (searchResult) => {
  return searchResult.map(
    (data: any): SearchResultItem => ({
      _id: data._id,
      name: data.title ? data.title : data.name,
      image: data.thumbnail ? data.thumbnail : data.avatar,
      url: data.slug ? `blog/post/${data.slug}` : `/profile/${data.username}`,
    })
  );
});

const postReducer = postSlice.reducer;
export default postReducer;
