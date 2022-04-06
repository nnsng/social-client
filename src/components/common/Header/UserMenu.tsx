import { Avatar, Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PopperMenu } from '..';
import GetUserMenuItemList from './GetUserMenuItemList';

export default function UserMenu() {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const { userMenuItemList, dividers } = GetUserMenuItemList({ navigate, dispatch, t });

  return (
    <>
      <Avatar
        src={currentUser?.avatar}
        sx={{
          width: 28,
          height: 28,
          ml: 1,
          cursor: 'pointer',
        }}
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
        }}
        zIndex={(theme) => (theme.zIndex as any).appBar + 1}
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

        {userMenuItemList.map(({ label, icon: Icon, onClick }, idx) => (
          <Box key={idx}>
            <MenuItem
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 1,
                fontSize: 15,
              }}
              onClick={() => handleMenuItemClick(onClick)}
            >
              <Icon fontSize="small" sx={{ mr: 2 }} />
              {label}
            </MenuItem>

            {dividers.includes(idx) && <Divider />}
          </Box>
        ))}
      </PopperMenu>
    </>
  );
}
