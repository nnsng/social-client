import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';
import { Post, SearchParams, SearchResultItem, User } from '~/models';

interface OtherState {
  search: {
    loading: boolean;
    result: Post[] | Partial<User>[];
  };
}

const initialState: OtherState = {
  search: {
    loading: false,
    result: [],
  },
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    searchWithDebounce(state, action: PayloadAction<SearchParams>) {
      state.search.loading = true;
    },
    searchWithDebounceSuccess(state, action: PayloadAction<Post[] | Partial<User>[]>) {
      state.search.loading = false;
      state.search.result = action.payload;
    },
    searchWithDebounceFailure(state) {
      state.search.loading = false;
    },
  },
});

export const otherActions = otherSlice.actions;

export const selectSearchLoading = (state: RootState) => state.other.search.loading;
export const selectSearchResult = (state: RootState) => state.other.search.result;

export const selectFormattedSearchResult = createSelector(selectSearchResult, (searchResult) => {
  return searchResult.map(
    (data: any): SearchResultItem => ({
      _id: data._id,
      name: data.title ? data.title : data.name,
      image: data.thumbnail ? data.thumbnail : data.avatar,
      url: data.slug ? `/post/${data.slug}` : `/profile/${data.username}`,
    })
  );
});

const otherReducer = otherSlice.reducer;
export default otherReducer;
