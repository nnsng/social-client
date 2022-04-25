import { NotificationsRounded } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  MenuItem,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { INotification, IUser } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from 'utils/common';
import { PopperMenu } from '..';
import HeaderIconButton from './HeaderIconButton';

export default function Notification() {
  const { t } = useTranslation('header');

  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState<boolean>(false);
  const [notiList, setNotiList] = useState<INotification[]>([]);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleNoti = () => setOpen(!open);
  const closeNoti = () => setOpen(false);

  useEffect(() => {
    if (!currentUser) return;

    const welcomeNoti: INotification = {
      _id: 'welcome',
      notiTo: currentUser?._id || '',
      user: currentUser as IUser,
      read: false,
      linkTo: '/',
      type: 'welcome',
      createdAt: currentUser?.createdAt || formatTime(new Date()),
    };
    const likeNoti: INotification = {
      ...welcomeNoti,
      _id: 'like',
      read: false,
      type: 'like',
    };
    setNotiList([welcomeNoti, likeNoti]);
  }, [currentUser]);

  const makeAsRead = (noti: INotification) => {
    setNotiList((prevState) =>
      prevState.map((item) => ({
        ...item,
        read: item._id === noti._id ? true : item.read,
      }))
    );
  };

  const makeAllAsRead = () => {
    setNotiList((prevState) => prevState.map((item) => ({ ...item, read: true })));
  };

  const showBackdrop = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderIconButton
        ref={anchorRef}
        icon={<NotificationsRounded />}
        active={open}
        onClick={toggleNoti}
        showBadge={notiList.filter((noti) => !noti.read).length > 0}
      />

      {showBackdrop && (
        <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}></Backdrop>
      )}

      <PopperMenu
        open={open}
        anchorEl={anchorRef.current}
        paperSx={{
          width: { xs: '100vw', sm: 400 },
          mt: 1,
          py: { xs: 2, sm: 0 },
          borderRadius: { xs: 4, sm: 1 },
        }}
        zIndex={(theme) => (theme.zIndex as any).appBar + 1}
        onClose={closeNoti}
      >
        <Stack alignItems="center" justifyContent="space-between" px={2} py={1}>
          <Typography variant="h6" fontWeight={600} sx={{ cursor: 'default' }}>
            {t('notification.label')}
          </Typography>

          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={makeAllAsRead}
          >
            {t('notification.markAsRead')}
          </Typography>
        </Stack>

        <Divider sx={{ m: 0 }} />

        <Box p={0.8} mb={-0.8}>
          {notiList.map((noti) => (
            // <Link key={noti._id} to={noti.linkTo || '/'}>
            <MenuItem
              key={noti._id}
              sx={{
                borderRadius: 1,
                bgcolor: noti.read ? undefined : 'action.hover',
                mb: 0.8,
              }}
              onClick={() => makeAsRead(noti)}
            >
              <Avatar src={noti.user?.avatar} sx={{ width: 48, height: 48 }} />

              <Box flexGrow={1} ml={2}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    whiteSpace: 'normal',
                  }}
                >
                  {t(`notification.type.${noti.type}`, { name: noti.user.name })}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" fontWeight="400">
                  {formatTime(noti.createdAt)}
                </Typography>
              </Box>
            </MenuItem>
            // </Link>
          ))}
        </Box>
      </PopperMenu>
    </>
  );
}
