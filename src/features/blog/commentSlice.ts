import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IComment } from 'models';

export interface ICommentState {
  loading: boolean;
  postComments: IComment[];
}

const initialState: ICommentState = {
  loading: false,
  postComments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchPostComments(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchPostCommentsSuccess(state, action: PayloadAction<IComment[]>) {
      state.loading = false;
      state.postComments = action.payload;
    },
    fetchPostCommentsFailure(state) {
      state.loading = false;
    },

    create(state, action: PayloadAction<IComment>) {
      state.postComments = [action.payload, ...state.postComments];
    },

    edit(state, action: PayloadAction<IComment>) {
      const editedComment = action.payload;

      state.postComments = state.postComments.map((comment) =>
        comment._id === editedComment._id ? editedComment : comment
      );
    },

    remove(state, action: PayloadAction<string>) {
      state.postComments = state.postComments.filter((comment) => comment._id !== action.payload);
    },

    like(state, action: PayloadAction<string>) {},
    likeSuccess(state, action: PayloadAction<IComment>) {
      const likedComment = action.payload;
      state.postComments = state.postComments.map((comment) =>
        comment._id === likedComment._id ? likedComment : comment
      );
    },
  },
});

export const commentActions = commentSlice.actions;

export const selectCommentLoading = (state: RootState) => state.comment.loading;
export const selectPostComments = (state: RootState) => state.comment.postComments;

const commentReducer = commentSlice.reducer;
export default commentReducer;
