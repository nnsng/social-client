import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { INotification } from 'models';

export interface INotiState {
  list: INotification[];
}

const initialState: INotiState = {
  list: [],
};

const checkNotiEqual = (a: INotification, b: INotification) => {
  return a.type === b.type && a.post.slug === b.post.slug && a.user.username === b.user.username;
};

const notiSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<INotification>) {
      const newNoti = action.payload;
      state.list = state.list.filter((noti) => !checkNotiEqual(noti, newNoti));
      state.list = [newNoti, ...state.list].slice(0, 5);
    },
    markAsRead(state, action: PayloadAction<INotification[]>) {
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
