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
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatTime } from 'utils/common';
import { APP_NAME } from 'utils/constants';
import { themeVariables } from 'utils/theme';
import { PopperMenu } from '..';
import HeaderIconButton from './HeaderIconButton';

export default function Notification() {
  const { t } = useTranslation('header');

  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleNoti = () => setOpen(!open);
  const closeNoti = () => setOpen(false);

  const showBackdrop = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderIconButton
        ref={anchorRef}
        icon={<NotificationsRounded />}
        active={open}
        onClick={toggleNoti}
      />

      {showBackdrop && (
        <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}></Backdrop>
      )}

      <PopperMenu
        open={open}
        anchorEl={anchorRef.current}
        paperSx={{
          width: { xs: `calc(100vw - ${themeVariables.scrollbarWidth}px)`, sm: 400 },
          mt: 1,
          borderRadius: 1,
        }}
        zIndex={(theme) => (theme.zIndex as any).appBar + 1}
        onClose={closeNoti}
      >
        <Stack alignItems="center" justifyContent="space-between" px={2} py={1}>
          <Typography variant="h6" fontWeight={600} sx={{ cursor: 'default' }}>
            {t('notification.label')}
          </Typography>

          {/* <Typography
            variant="body2"
            fontSize={12}
            fontWeight={500}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {t('notification.markAsRead')}
          </Typography> */}
        </Stack>

        <Divider sx={{ m: 0 }} />

        <Box p={0.8} mb={-0.8} width="100%">
          <MenuItem
            sx={{
              borderRadius: 1,
              mb: 0.8,
            }}
          >
            <Avatar src={currentUser?.avatar} sx={{ width: 40, height: 40 }} />

            <Box flexGrow={1} ml={2}>
              <Typography
                fontSize={15}
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  whiteSpace: 'normal',
                }}
              >
                {t('notification.welcomeText', { name: currentUser?.name, appName: APP_NAME })}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" fontWeight="400">
                {formatTime(currentUser?.createdAt)}
              </Typography>
            </Box>
          </MenuItem>
        </Box>
      </PopperMenu>
    </>
  );
}
