import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from 'models';

export interface CommentState {
  loading: boolean;
  commentCount: number;
  postComments: Comment[];
}

const initialState: CommentState = {
  loading: false,
  commentCount: 0,
  postComments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchPostComments(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchPostCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.loading = false;
      state.postComments = action.payload;
      state.commentCount = state.postComments.length;
    },
    fetchPostCommentsFailure(state) {
      state.loading = false;
    },

    createComment(state, action: PayloadAction<Comment>) {
      state.postComments = [action.payload, ...state.postComments];
      state.commentCount = state.postComments.length;
    },

    removeComment(state, action: PayloadAction<string>) {
      state.postComments = state.postComments.filter((comment) => comment._id !== action.payload);
      state.commentCount = state.postComments.length;
    },

    likeComment(state, action: PayloadAction<string>) {},
    likeCommentSuccess(state, action: PayloadAction<Comment>) {
      const likedComment = action.payload;
      state.postComments = state.postComments.map((comment) =>
        comment._id === likedComment._id ? likedComment : comment
      );
    },
  },
});

export const commentActions = commentSlice.actions;

export const selectCommentLoading = (state: RootState) => state.comment.loading;
export const selectCommentCount = (state: RootState) => state.comment.commentCount;
export const selectPostComments = (state: RootState) => state.comment.postComments;

const commentReducer = commentSlice.reducer;
export default commentReducer;
