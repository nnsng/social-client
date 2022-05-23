import { useAppDispatch } from 'app/hooks';
import { chatActions } from 'features/chat/chatSlice';
import { IMessageResponse } from 'models';
import { useEffect } from 'react';
import { ISocketProps } from '..';

export default function ChatSocket({ socket }: ISocketProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on('chat', (payload: IMessageResponse) => {
      dispatch(chatActions.addMessage(payload));
    });

    return () => {
      socket.off('chat');
    };
  }, [socket, dispatch]);

  return null;
}
