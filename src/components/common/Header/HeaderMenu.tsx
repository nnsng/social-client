import { ChatRounded, SearchRounded } from '@mui/icons-material';
import { Hidden, Stack } from '@mui/material';
import React from 'react';
import DrawerMobile from './DrawerMobile';
import HeaderIconButton from './HeaderIconButton';
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
        <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
        <Notification />
        <DrawerMobile />
      </Hidden>

      {/* Tablet & PC */}
      <Hidden smDown>
        <HeaderIconButton icon={<ChatRounded />} onClick={() => {}} />
        <Notification />
        <UserMenu />
      </Hidden>
    </Stack>
  );
}
