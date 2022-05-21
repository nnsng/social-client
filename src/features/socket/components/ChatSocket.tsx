import { useAppDispatch } from 'app/hooks';
import { IMessage, chatActions } from 'features/chat/chatSlice';
import { useEffect } from 'react';
import { ISocketProps } from '..';

export default function ChatSocket({ socket }: ISocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('chat', ({ message }: { message: IMessage }) => {
      dispatch(chatActions.addMessage(message));
    });

    return () => {
      socket.off('chat');
    };
  }, [socket, dispatch]);

  return null;
}
