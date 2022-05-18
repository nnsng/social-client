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
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notiActions, selectNotiList } from 'features/common/notiSlice';
import { INotification } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/common';
import { themeVariables } from 'utils/theme';
import { PopperPopup } from '..';
import HeaderIconButton from './HeaderIconButton';

export default function Notification() {
  const navigate = useNavigate();

  const { t } = useTranslation('notification');

  const dispatch = useAppDispatch();
  const notiList = useAppSelector(selectNotiList);

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleNoti = () => setOpen(!open);
  const closeNoti = () => setOpen(false);

  const markAsRead = (notiList: INotification[]) => {
    dispatch(notiActions.markAsRead(notiList));
  };

  const handleCommentClick = (noti: INotification) => {
    const { type, postSlug, user } = noti;

    closeNoti();

    if (type === 'follow') {
      navigate(`/user/${user.username}`);
    } else {
      navigate(`/blog/post/${postSlug}`, { state: { openComment: type === 'comment' } });
    }

    markAsRead([noti]);
  };

  const hasUnreadNoti = () => notiList.some((noti) => !noti.read);

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderIconButton
        ref={anchorRef}
        icon={<NotificationsRounded />}
        active={open}
        showBadge={hasUnreadNoti()}
        onClick={toggleNoti}
      />

      {smDown && (
        <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}></Backdrop>
      )}

      <PopperPopup
        open={open}
        anchorEl={anchorRef.current}
        sx={{
          width: { xs: `calc(100vw - ${themeVariables.scrollbarWidth}px)`, sm: 400 },
          mt: 1,
          borderRadius: 1,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
        onClose={closeNoti}
      >
        <Stack alignItems="center" justifyContent="space-between" px={2} py={1}>
          <Typography fontSize="1.2rem" fontWeight={600} sx={{ cursor: 'default' }}>
            {t('label.title')}
          </Typography>

          <Typography
            fontSize={12}
            fontWeight={500}
            sx={{
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': {
                color: 'text.primary',
              },
            }}
            onClick={() => markAsRead(notiList)}
          >
            {t('label.markAsRead')}
          </Typography>
        </Stack>

        <Divider sx={{ m: 0 }} />

        <Stack direction="column" spacing={0.8} p={0.8} width="100%">
          {notiList.length > 0 ? (
            notiList.map((noti, idx) => (
              <MenuItem
                sx={{
                  borderRadius: 1,
                  bgcolor: !noti.read ? 'action.hover' : 'transparent',
                }}
                onClick={() => handleCommentClick(noti)}
              >
                <Avatar src={noti.user.avatar} sx={{ width: 40, height: 40 }} />

                <Box flexGrow={1} ml={2}>
                  <Typography color="text.primary" fontSize={15} whiteSpace="normal">
                    <Typography component="span" fontWeight={500}>
                      {noti.user.name}
                    </Typography>
                    {t(`message.${noti.type}`, { name: '' })}
                  </Typography>

                  <Typography color="text.secondary" fontSize={13} fontWeight="400">
                    {formatTime(noti.createdAt)}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <Typography color="text.secondary" fontSize={14} mx="auto">
              {t('label.empty')}
            </Typography>
          )}
        </Stack>
      </PopperPopup>
    </>
  );
}
