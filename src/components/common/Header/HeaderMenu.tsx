import { SearchRounded } from '@mui/icons-material';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import AppearanceDialog from './AppearanceDialog';
import DrawerMobile from './DrawerMobile';
import HeaderIconButton from './HeaderIconButton';
import Notification from './Notification';
import UserMenu from './UserMenu';

export interface HeaderMenuProps {
  toggleSearchMobile?: () => void;
}

export function HeaderMenu({ toggleSearchMobile }: HeaderMenuProps) {
  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Stack alignItems="center" ml="auto">
      {hideOnMobile ? (
        <>
          <Notification />
          <UserMenu />
        </>
      ) : (
        <>
          <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
          <Notification />
          <DrawerMobile />
        </>
      )}

      <AppearanceDialog />
    </Stack>
  );
}
