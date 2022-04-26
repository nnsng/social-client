import { useAppSelector } from 'app/hooks';
import CommentSocket from './components/CommentSocket';
import { selectSocket } from './socketSlice';

export interface ISocketProps {
  socket: any;
}

export default function SocketClient() {
  const socket = useAppSelector(selectSocket);

  const SocketComponents = [CommentSocket];

  return (
    <>
      {SocketComponents.map((Component, idx) => (
        <Component key={idx} socket={socket} />
      ))}
    </>
  );
}
