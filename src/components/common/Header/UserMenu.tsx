import {
  Avatar,
  Box,
  Divider,
  Drawer,
  MenuItem,
  MenuList,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { GetUserMenu } from 'components/functions';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { PopperPopup } from '..';

export interface IUserMenuProps {
  isOnMobile: boolean;
}

export default function UserMenu({ isOnMobile }: IUserMenuProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<any>(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const { userMenu, dividers } = GetUserMenu({ navigate, dispatch, t });

  const menuItemsComponent = (
    <>
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'center',
          p: { xs: '32px 0 16px 32px', sm: 1 }, // xs: [4, 0, 2, 4]
          color: 'text.primary',
        }}
        component={Link}
        to={`/user/${currentUser?.username}`}
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
          <Typography variant="body1" fontSize={16} fontWeight={600}>
            {currentUser?.name}
          </Typography>

          <Typography variant="body2" fontSize={14}>
            @{currentUser?.username}
          </Typography>
        </Box>
      </Box>

      <Divider />

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
            <Icon fontSize="small" sx={{ mr: 2 }} />
            {label}
          </MenuItem>

          {dividers.includes(idx) && <Divider />}
        </Box>
      ))}
    </>
  );

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

      {isOnMobile ? (
        <Drawer anchor="right" open={open} onClose={closeMenu}>
          <MenuList
            sx={{
              width: '75vw',
              maxWidth: 300,
              height: '100vh',
              p: 0,
              m: 0,
            }}
          >
            {menuItemsComponent}
          </MenuList>
        </Drawer>
      ) : (
        <PopperPopup
          open={open}
          anchorEl={anchorRef.current}
          sx={{
            minWidth: 280,
            mt: 1,
            p: 0.8,
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
          onClose={closeMenu}
        >
          {menuItemsComponent}
        </PopperPopup>
      )}
    </>
  );
}
