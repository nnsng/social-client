import { RootState } from '~/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket>) {
      return {
        ...state,
        socket: action.payload,
      };
    },
  },
});

export const socketActions = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket.socket;

const socketReducer = socketSlice.reducer;
export default socketReducer;
