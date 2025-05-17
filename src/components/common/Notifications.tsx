import { notificationApi } from '@/api';
import { Notification } from '@/models';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/slices/userSlice';
import { CloseRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins } from 'utils/theme';

const NUMBER_OF_NAME_TO_SHOW = 1;

interface NotificationsProps {
  open: boolean;
  onClose?: () => void;
}

export function Notifications(props: NotificationsProps) {
  const { open, onClose } = props;

  const { t } = useTranslation('notification');

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    (async () => {
      try {
        setLoading(true);

        const notifications = await notificationApi.getAll();
        setNotifications(notifications);
      } catch (error) {
        console.error('Failed to get notifications', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  const handleNotificationClick = ({ type, postSlug }: Notification) => {
    if (type === 'follow') {
      navigate(`/profile/${currentUser?.username}`);
    } else {
      navigate(`/post/${postSlug}`);
    }
    onClose?.();
  };

  const generateNamesString = (users: Notification['actionUsers']) => {
    if (users.length <= NUMBER_OF_NAME_TO_SHOW) {
      return users.map((user) => user.name).join(', ');
    }

    const names = users
      .slice(0, NUMBER_OF_NAME_TO_SHOW)
      .map((user) => user.name)
      .join(', ');
    const remainText = t('more', { remain: users.length - NUMBER_OF_NAME_TO_SHOW });
    return `${names} ${remainText}`;
  };

  return (
    <Box>
      <Box position="relative" pl={2} py={2}>
        <Typography variant="h6" fontWeight={600}>
          {t('label.title')}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseRounded />
        </IconButton>
      </Box>

      <Divider />

      <Box>
        {loading ? (
          <Stack justifyContent="center" py={2}>
            <CircularProgress size={28} />
          </Stack>
        ) : (
          <List>
            {notifications.map((notification) => (
              <Typography
                key={notification.updatedAt}
                variant="body2"
                component={ListItemButton}
                sx={{ py: 1, px: 2 }}
                onClick={() => handleNotificationClick(notification)}
              >
                <Avatar
                  src={notification.actionUsers[0].avatar}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />

                <Box
                  dangerouslySetInnerHTML={{
                    __html: t(`message.${notification.type}`, {
                      name: generateNamesString(notification.actionUsers),
                    }),
                  }}
                  sx={{ ...themeMixins.truncate(2) }}
                />
              </Typography>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
