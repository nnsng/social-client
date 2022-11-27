import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import CommentSocket from './components/CommentSocket';
import NotiSocket from './components/NotiSocket';
import { selectSocket } from './socketSlice';

export interface SocketProps {
  socket: Socket;
}

export default function SocketClient() {
  const socket = useAppSelector(selectSocket);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!socket || !currentUser) return;
    socket.emit('joinSocial', { userId: currentUser._id });

    return () => {
      socket.emit('leaveSocial', { userId: currentUser._id });
    };
  }, [socket, currentUser]);

  if (!socket) return null;

  const SocketComponents = [NotiSocket, CommentSocket];

  return (
    <>
      {SocketComponents.map((Socket, idx) => (
        <Socket key={idx} socket={socket} />
      ))}
    </>
  );
}
