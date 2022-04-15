import { useAppSelector } from 'app/hooks';
import CommentSocket from './components/CommentSocket';
import NotificationSocket from './components/NotificationSocket';
import { selectSocket } from './socketSlice';

export interface SocketProps {
  socket: any;
}

export default function SocketClient() {
  const socket = useAppSelector(selectSocket);

  return (
    <>
      <NotificationSocket socket={socket} />
      <CommentSocket socket={socket} />
    </>
  );
}
