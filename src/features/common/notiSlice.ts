import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Noti } from 'models';

export interface NotiState {
  list: Noti[];
}

const initialState: NotiState = {
  list: [],
};

const checkNotiEqual = (a: Noti, b: Noti) => {
  return a.type === b.type && a.post.slug === b.post.slug && a.user.username === b.user.username;
};

const notiSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Noti>) {
      const newNoti = action.payload;
      state.list = state.list.filter((noti) => !checkNotiEqual(noti, newNoti));
      state.list = [newNoti, ...state.list].slice(0, 5);
    },
    markAsRead(state, action: PayloadAction<Noti[]>) {
      state.list = state.list.map((noti) => {
        if (action.payload.some((n) => checkNotiEqual(n, noti))) {
          return { ...noti, read: true };
        }
        return noti;
      });
    },
  },
});

export const notiActions = notiSlice.actions;

export const selectNotiList = (state: RootState) => state.noti.list;

const notiReducer = notiSlice.reducer;
export default notiReducer;
