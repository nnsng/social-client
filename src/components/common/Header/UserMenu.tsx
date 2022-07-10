import {
  AddCircleRounded,
  BookmarkRounded,
  DarkModeRounded,
  LogoutOutlined,
  Settings,
} from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, MenuItem, MenuList, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppearanceDialog, PopperPopup } from '..';

export interface IUserMenuProps {
  isOnMobile: boolean;
}

export default function UserMenu({ isOnMobile }: IUserMenuProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const anchorRef = useRef<any>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const closeDialog = () => setOpenDialog(false);

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const gotoProfile = () => {
    closeMenu();
    navigate(`/user/${currentUser?.username}`);
  };

  const logout = () => {
    dispatch(authActions.logout({ navigate }));
  };

  const userMenu: IMenuItem[] = [
    {
      label: t('menu.create'),
      icon: AddCircleRounded,
      onClick: () => navigate?.('/blog/create', { state: { hideHeaderMenu: true } }),
    },
    {
      label: t('menu.saved'),
      icon: BookmarkRounded,
      onClick: () => navigate?.('/blog/saved'),
    },
    {
      label: t('menu.appearance'),
      icon: DarkModeRounded,
      onClick: () => setOpenDialog(true),
    },
    {
      label: t('menu.settings'),
      icon: Settings,
      onClick: () => navigate?.('/settings'),
    },
    {
      label: t('menu.logout'),
      icon: LogoutOutlined,
      onClick: logout,
    },
  ];
  const dividers: number[] = [0, 1, 3];

  return (
    <>
      <Avatar
        src={currentUser?.avatar}
        sx={{
          width: 36,
          height: 36,
          ml: 2,
          cursor: 'pointer',
        }}
        ref={anchorRef}
        onClick={toggleMenu}
      />

      <MenuItemWrapper
        isOnMobile={isOnMobile}
        anchorEl={anchorRef.current}
        open={openMenu}
        onClose={closeMenu}
      >
        <Box>
          <Box
            sx={{
              display: { xs: 'block', sm: 'flex' },
              alignItems: 'center',
              p: { xs: '32px 32px 16px 32px', sm: 1 }, // xs: [4, 4, 2, 4]
              cursor: 'pointer',
            }}
            onClick={gotoProfile}
          >
            <Avatar
              src={currentUser?.avatar}
              sx={{
                width: { xs: 60, sm: 40 },
                height: { xs: 60, sm: 40 },
                mb: { xs: 1, sm: 0 },
              }}
            />

            <Box ml={{ xs: 0, sm: 2 }}>
              <Typography fontSize={16} fontWeight={500}>
                {currentUser?.name}
              </Typography>

              <Typography fontSize={14}>@{currentUser?.username}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: '6px !important' }} />

          {userMenu.map(({ label, icon: Icon, onClick }, idx) => (
            <Box key={idx}>
              <MenuItem
                sx={{
                  py: 1.5,
                  px: { xs: 4, sm: 2 },
                  borderRadius: 1,
                  fontSize: 15,
                }}
                onClick={() => handleMenuItemClick?.(onClick)}
              >
                <Icon sx={{ mr: 2, fontSize: 18 }} />
                {label}
              </MenuItem>

              {dividers.includes(idx) && <Divider sx={{ my: '6px !important' }} />}
            </Box>
          ))}
        </Box>
      </MenuItemWrapper>

      <AppearanceDialog open={openDialog} onClose={closeDialog} />
    </>
  );
}

interface IMenuitemWrapperProps {
  isOnMobile: boolean;
  open: boolean;
  onClose?: () => void;
  anchorEl: any;
  children: React.ReactElement;
}

function MenuItemWrapper(props: IMenuitemWrapperProps) {
  const { isOnMobile, open, onClose, anchorEl, children } = props;

  return isOnMobile ? (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <MenuList
        sx={{
          width: '75vw',
          maxWidth: 300,
          height: '100vh',
          p: 0,
          m: 0,
        }}
      >
        {children}
      </MenuList>
    </Drawer>
  ) : (
    <PopperPopup
      open={open}
      anchorEl={anchorEl}
      sx={{
        minWidth: 280,
        mt: 1,
        p: 0.8,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
      onClose={onClose}
    >
      {children}
    </PopperPopup>
  );
}
