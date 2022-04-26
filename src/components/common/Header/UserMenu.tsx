import {
  Avatar,
  Box,
  Divider,
  Drawer,
  MenuItem,
  MenuList,
  SxProps,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem, IUser } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PopperMenu } from '..';
import { GetUserMenu } from '../Menu';

export interface IUserMenuProps {
  isOnMobile?: boolean;
}

export default function UserMenu({ isOnMobile }: IUserMenuProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

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
          width: 36,
          height: 36,
          ml: 2,
          cursor: 'pointer',
        }}
        ref={anchorRef as any}
        onClick={toggleMenu}
      />

      {isOnMobile ? (
        <Drawer anchor="right" open={open} onClose={closeMenu}>
          <MenuList
            sx={{
              width: '75vw',
              maxWidth: 300,
              height: '100vh',
            }}
          >
            <Children
              isOnMobile={isOnMobile}
              menuList={userMenu}
              user={currentUser}
              dividers={dividers}
              onMenuItemClick={handleMenuItemClick}
            />
          </MenuList>
        </Drawer>
      ) : (
        <PopperMenu
          open={open}
          anchorEl={anchorRef.current}
          paperSx={{
            minWidth: 280,
            mt: 2,
            p: 0.8,
          }}
          zIndex={(theme) => (theme.zIndex as any).appBar + 1}
          onClose={closeMenu}
        >
          <Children
            isOnMobile={isOnMobile}
            menuList={userMenu}
            user={currentUser}
            dividers={dividers}
            onMenuItemClick={handleMenuItemClick}
          />
        </PopperMenu>
      )}
    </>
  );
}

interface IChildrenProps {
  isOnMobile?: boolean;
  menuList?: IMenuItem[];
  user?: IUser | null;
  dividers?: number[];
  onMenuItemClick?: (callback?: () => void) => void;
}

function Children(props: IChildrenProps) {
  const { isOnMobile, menuList, user, dividers, onMenuItemClick } = props;

  const boxSx: SxProps = !!isOnMobile
    ? {
        ml: 4,
        py: 4,
      }
    : {
        display: 'flex',
        alignItems: 'center',
        p: 1,
      };

  return (
    <>
      <Box sx={boxSx}>
        <Avatar
          src={user?.avatar}
          sx={{
            width: { xs: 60, sm: 40 },
            height: { xs: 60, sm: 40 },
          }}
        />

        <Box ml={{ xs: 0, sm: 2 }}>
          <Typography variant="body1" fontSize={16} fontWeight={600}>
            {user?.name}
          </Typography>

          <Typography variant="body2" fontSize={14}>
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {menuList &&
        menuList.map(({ label, icon: Icon, onClick }, idx) => (
          <Box key={idx}>
            <MenuItem
              sx={{
                py: 1.5,
                px: { xs: 4, sm: 2 },
                borderRadius: 1,
                fontSize: 15,
              }}
              onClick={() => onMenuItemClick?.(onClick)}
            >
              <Icon fontSize="small" sx={{ mr: 2 }} />
              {label}
            </MenuItem>

            {(dividers || []).includes(idx) && <Divider />}
          </Box>
        ))}
    </>
  );
}
