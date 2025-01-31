import { NotificationType } from '@/models';
import { useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SocketProps } from './SocketClient';

const EVENTS = {
  NOTIFY: 'notify',
};

interface NotificationPayload {
  type: NotificationType;
  user: string;
  url?: string;
}

export function NotificationSocket({ socket }: SocketProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('notification');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    socket.on(EVENTS.NOTIFY, ({ type, user, url }: NotificationPayload) => {
      toast.info(generateHtmlContent(t(`message.${type}`, { name: user })), {
        onClick: () => url && navigate(url),
      });
    });

    return () => {
      socket.off(EVENTS.NOTIFY);
    };
  }, [socket, dispatch]);

  return null;
}

const generateHtmlContent = (content: string) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};
