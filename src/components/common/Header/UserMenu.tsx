import {
  AddCircleOutlineOutlined,
  BookmarkBorderOutlined,
  ListAltOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem } from 'models';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme, { mixins, themeConstants } from 'utils/theme';
import { PopperMenu } from '..';

export default function UserMenu() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleGotoPage = (path: string) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    closeMenu();
    dispatch(authActions.logout({ navigate }));
  };

  const userMenuList: IMenuItem[] = [
    {
      label: 'Viết bài',
      icon: AddCircleOutlineOutlined,
      onClick: () => handleGotoPage('/blog/create'),
    },
    {
      label: 'Bài viết của tôi',
      icon: ListAltOutlined,
      onClick: () => handleGotoPage('/blog/my'),
    },
    {
      label: 'Đã lưu',
      icon: BookmarkBorderOutlined,
      onClick: () => handleGotoPage('/blog/saved'),
    },
    {
      label: 'Cài đặt',
      icon: SettingsOutlined,
      onClick: () => handleGotoPage('/settings'),
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
        sx={{ ...mixins.size(28), cursor: 'pointer' }}
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
          <Avatar src={currentUser?.avatar} sx={{ ...mixins.size(40) }} />

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
