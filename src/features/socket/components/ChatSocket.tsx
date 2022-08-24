import { useAppDispatch } from 'app/hooks';
import { chatActions } from 'features/chat/chatSlice';
import { MessageResponse } from 'models';
import { useEffect } from 'react';
import { SocketProps } from '..';

export default function ChatSocket({ socket }: SocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('chat', (payload: MessageResponse) => {
      dispatch(chatActions.addMessage(payload));
    });

    return () => {
      socket.off('chat');
    };
  }, [socket, dispatch]);

  return null;
}
