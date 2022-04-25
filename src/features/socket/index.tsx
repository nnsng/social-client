import { useAppSelector } from 'app/hooks';
import CommentSocket from './components/CommentSocket';
import NotificationSocket from './components/NotificationSocket';
import { selectSocket } from './socketSlice';

export interface ISocketProps {
  socket: any;
}

export default function SocketClient() {
  const socket = useAppSelector(selectSocket);

  const SocketComponents = [NotificationSocket, CommentSocket];

  return (
    <>
      {SocketComponents.map((Component, idx) => (
        <Component key={idx} socket={socket} />
      ))}
    </>
  );
}
