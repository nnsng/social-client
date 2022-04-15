import { Avatar, Box, Divider, Drawer, MenuItem, MenuList, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetUserMenu } from '../Menu';

export default function DrawerMobile() {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const { userMenu, dividers } = GetUserMenu({ navigate, dispatch, t });

  return (
    <>
      <Avatar
        src={currentUser?.avatar}
        sx={{
          width: 28,
          height: 28,
          ml: 1.5,
          cursor: 'pointer',
        }}
        onClick={toggleMenu}
      />

      <Drawer anchor="right" open={openMenu} onClose={closeMenu}>
        <MenuList
          sx={{
            width: '75vw',
            maxWidth: 300,
            height: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Box ml={4} py={4}>
            <Avatar src={currentUser?.avatar} sx={{ width: 60, height: 60, mb: 2 }} />

            <Box>
              <Typography variant="body1" fontSize={16} fontWeight={600}>
                {currentUser?.fullName}
              </Typography>

              <Typography variant="body2" fontSize={14}>
                {currentUser?.email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {userMenu.map(({ label, icon: Icon, onClick }, idx) => (
            <Box key={idx}>
              <MenuItem
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 1,
                  fontSize: 15,
                }}
                onClick={() => handleMenuItemClick(onClick)}
              >
                <Icon sx={{ mr: 2 }} />
                {label}
              </MenuItem>

              {dividers.includes(idx) && <Divider />}
            </Box>
          ))}
        </MenuList>
      </Drawer>
    </>
  );
}
