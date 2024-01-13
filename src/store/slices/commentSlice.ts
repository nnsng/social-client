import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store';
import { Comment } from '~/models';
import { commentApi } from '~/api';

export const fetchPostComments = createAsyncThunk(
  'comment/fetchPostComments',
  async (postId: string, { rejectWithValue }) => {
    try {
      return await commentApi.fetchPostComments(postId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    updateComment(state, action: PayloadAction<Comment>) {
      const payloadComment = action.payload;
      if (state.list) {
        state.list = state.list.map((comment) =>
          comment._id === payloadComment._id ? payloadComment : comment
        );
      }
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loading = true;
        state.list = [];
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const commentActions = commentSlice.actions;

export const selectCommentLoading = (state: RootState) => state.comment.loading;
export const selectPostComments = (state: RootState) => state.comment.list;

const commentReducer = commentSlice.reducer;
export default commentReducer;
