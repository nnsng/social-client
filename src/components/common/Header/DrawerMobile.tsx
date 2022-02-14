import {
  AddCircleOutlineOutlined,
  BookmarkBorderOutlined,
  ListAltOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, MenuItem, MenuList, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem } from 'models';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawerMobile() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);

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

  const drawerMenuItems: IMenuItem[] = [
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
        sx={{
          width: 28,
          height: 28,
          cursor: 'pointer',
        }}
        onClick={toggleMenu}
      />

      <Drawer anchor="right" open={openMenu} onClose={closeMenu}>
        <MenuList sx={{ width: '75vw', maxWidth: 300 }}>
          <Box ml={4} py={4}>
            <Avatar src={currentUser?.avatar} sx={{ width: 60, height: 60, mb: 2 }} />

            <Box>
              <Typography variant="body1" fontSize={16} fontWeight="600">
                {currentUser?.name}
              </Typography>

              <Typography variant="body2" fontSize={14}>
                {currentUser?.email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {drawerMenuItems.map(({ label, icon: Icon, onClick }, idx) => (
            <Box key={idx}>
              <MenuItem
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 1,
                  fontSize: 15,
                }}
                onClick={onClick}
              >
                <Icon sx={{ mr: 2 }} />
                {label}
              </MenuItem>

              {[1, 2].includes(idx) && <Divider />}
            </Box>
          ))}
        </MenuList>
      </Drawer>
    </>
  );
}
