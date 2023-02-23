import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store';
import { Comment } from '~/models';

interface CommentState {
  loading: boolean;
  list: Comment[];
}

const initialState: CommentState = {
  loading: false,
  list: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchPostComments(state, action: PayloadAction<string>) {
      state.loading = true;
      state.list = [];
    },
    fetchPostCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPostCommentsFailure(state) {
      state.loading = false;
    },

    create(state, action: PayloadAction<Comment>) {
      state.list = [action.payload, ...state.list];
    },

    edit(state, action: PayloadAction<Comment>) {
      const editedComment = action.payload;

      state.list = state.list.map((comment) =>
        comment._id === editedComment._id ? editedComment : comment
      );
    },

    remove(state, action: PayloadAction<string>) {
      state.list = state.list.filter((comment) => comment._id !== action.payload);
    },

    like(state, action: PayloadAction<string>) {},
    likeSuccess(state, action: PayloadAction<Comment>) {
      const likedComment = action.payload;
      state.list = state.list.map((comment) =>
        comment._id === likedComment._id ? likedComment : comment
      );
    },
  },
});

export const commentActions = commentSlice.actions;

export const selectCommentLoading = (state: RootState) => state.comment.loading;
export const selectPostComments = (state: RootState) => state.comment.list;

const commentReducer = commentSlice.reducer;
export default commentReducer;
