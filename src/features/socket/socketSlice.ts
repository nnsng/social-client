import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface SocketState {
  socket: any;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket>) {
      state.socket = action.payload;
    },
  },
});

export const socketActions = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket.socket;

const socketReducer = socketSlice.reducer;
export default socketReducer;
