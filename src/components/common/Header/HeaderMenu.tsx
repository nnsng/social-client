import { SearchRounded } from '@mui/icons-material';
import { Hidden, IconButton, Stack } from '@mui/material';
import React from 'react';
import { LanguageSelect } from '../LanguageSelect';
import DrawerMobile from './DrawerMobile';
import Notification from './Notification';
import UserMenu from './UserMenu';

export interface HeaderMenuProps {
  toggleSearchMobile?: () => void;
}

export function HeaderMenu({ toggleSearchMobile }: HeaderMenuProps) {
  return (
    <Stack direction="row" alignItems="center" ml="auto">
      {/* Mobile */}
      <Hidden smUp>
        <IconButton
          disableTouchRipple
          sx={{
            mr: 1,
            color: 'text.secondary',
            fontSize: 18,

            ':hover': {
              bgcolor: 'transparent',
              color: 'text.primary',
            },
          }}
          onClick={toggleSearchMobile}
        >
          <SearchRounded />
        </IconButton>

        <LanguageSelect />
        <Notification />
        <DrawerMobile />
      </Hidden>

      {/* Tablet & PC */}
      <Hidden smDown>
        <LanguageSelect />
        <Notification />
        <UserMenu />
      </Hidden>
    </Stack>
  );
}
