import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { SocketProps } from '..';

export default function NotificationSocket({ socket }: SocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('listenNoti', ({ notification }: any) => {
      console.log('listenNoti', notification.message);
    });

    return () => {
      socket.off('listenNoti');
    };
  }, [socket, dispatch]);

  return null;
}
