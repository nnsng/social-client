import { NotificationsRounded } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Box,
  Divider,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatTime } from 'utils/common';
import { APP_NAME } from 'utils/constants';
import { PopperMenu } from '..';
import HeaderIconButton from './HeaderIconButton';

function WelcomeText({ name }: { name?: string }) {
  const { t } = useTranslation('header');

  return (
    <>
      {t('notification.welcome1')}
      <Typography component="span" fontWeight={500}>
        {name || ''}{' '}
      </Typography>
      {t('notification.welcome2')}
      <Typography component="span" fontWeight={500}>
        {APP_NAME}
      </Typography>
      {'.'}
    </>
  );
}

export default function Notification() {
  const currentUser = useAppSelector(selectCurrentUser);

  const { t } = useTranslation('header');

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const showBackdrop = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <HeaderIconButton
        ref={anchorRef}
        icon={<NotificationsRounded />}
        active={openMenu}
        onClick={toggleMenu}
      />

      {showBackdrop && (
        <Backdrop open={openMenu} sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}></Backdrop>
      )}

      <PopperMenu
        open={openMenu}
        anchorEl={anchorRef.current}
        paperSx={{
          width: { xs: '100vw', sm: 400 },
          mt: 1,
          py: { xs: 2, sm: 0 },
          borderRadius: { xs: 4, sm: 1 },
        }}
        zIndex={(theme) => (theme.zIndex as any).appBar + 1}
        onClose={closeMenu}
      >
        <Typography variant="h6" fontWeight={600} px={2} py={1} sx={{ cursor: 'default' }}>
          {t('notification.label')}
        </Typography>

        <Divider sx={{ m: 0 }} />

        <Box p={0.8}>
          {Array.from(new Array(1)).map((_, idx) => (
            <Link key={idx} to="/blog">
              <MenuItem sx={{ borderRadius: 1 }} onClick={closeMenu}>
                <Avatar src={currentUser?.avatar} sx={{ width: 48, height: 48, mr: 2 }} />

                <Box flexGrow={1}>
                  <Typography variant="body1" color="text.primary" mb={0.5} whiteSpace="normal">
                    <WelcomeText name={currentUser?.name} />
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" fontWeight="400">
                    {formatTime(currentUser?.createdAt)}
                  </Typography>
                </Box>
              </MenuItem>
            </Link>
          ))}
        </Box>
      </PopperMenu>
    </>
  );
}
