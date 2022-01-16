import {
  AddCircleOutlineOutlined,
  BookmarkBorderOutlined,
  ListAltOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem } from 'models';
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import theme, { themeConstants } from 'utils/theme';
import { PopperMenu } from '..';

export default function UserMenu() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const gotoCreateEditPage = () => {
    closeMenu();
    navigate('/blog/create');
  };

  const gotoMyPostList = () => {
    closeMenu();
    navigate('/blog/my');
  };

  const gotoSavedPage = () => {
    closeMenu();
    navigate('/blog/saved');
  };

  const gotoSettings = () => {
    closeMenu();
    navigate('/settings');
  };

  const handleLogout = () => {
    closeMenu();
    dispatch(authActions.logout({ navigate }));
  };

  const userMenuList: IMenuItem[] = [
    {
      label: 'Viết bài',
      icon: AddCircleOutlineOutlined,
      onClick: gotoCreateEditPage,
    },
    {
      label: 'Bài viết của tôi',
      icon: ListAltOutlined,
      onClick: gotoMyPostList,
    },
    {
      label: 'Đã lưu',
      icon: BookmarkBorderOutlined,
      onClick: gotoSavedPage,
    },
    {
      label: 'Cài đặt',
      icon: SettingsOutlined,
      onClick: gotoSettings,
    },
    {
      label: 'Đăng xuất',
      icon: LogoutOutlined,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Avatar
        src={currentUser?.avatar}
        sx={{ width: 28, height: 28, cursor: 'pointer' }}
        ref={anchorRef as any}
        onClick={toggleMenu}
      />

      <PopperMenu
        open={openMenu}
        anchorEl={anchorRef.current}
        paperSx={{
          minWidth: 280,
          mt: 2,
          p: 0.8,
          boxShadow: themeConstants.boxShadow,
        }}
        zIndex={theme.zIndex.appBar + 1}
        onClose={closeMenu}
      >
        <Stack direction="row" alignItems="center" p={1}>
          <Avatar src={currentUser?.avatar} sx={{ width: 40, height: 40 }} />

          <Box ml={2}>
            <Typography variant="body1" fontWeight="600">
              {currentUser?.name}
            </Typography>

            <Typography variant="body2">{currentUser?.email}</Typography>
          </Box>
        </Stack>

        <Divider />

        {userMenuList.map(({ label, icon: Icon, onClick }, idx) => (
          <Box key={idx}>
            <MenuItem
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 1,
                fontSize: 15,
              }}
              onClick={onClick}
            >
              <Icon fontSize="small" sx={{ mr: 2 }} />
              {label}
            </MenuItem>

            {[1, 2].includes(idx) && <Divider />}
          </Box>
        ))}
      </PopperMenu>
    </>
  );
}
