import { SearchRounded } from '@mui/icons-material';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AppearanceDialog from './AppearanceDialog';
import HeaderIconButton from './HeaderIconButton';
import Notification from './Notification';
import UserMenu from './UserMenu';

export interface IHeaderMenuProps {
  toggleSearchMobile?: () => void;
}

export function HeaderMenu({ toggleSearchMobile }: IHeaderMenuProps) {
  const location = useLocation();
  const isShow = !(location.state as any)?.hideHeaderMenu;

  const isOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return isShow || mdUp ? (
    <Stack alignItems="center" ml="auto">
      {isOnMobile && location.pathname === '/blog' && (
        <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
      )}

      <Notification />

      <UserMenu isOnMobile={isOnMobile} />

      <AppearanceDialog />
    </Stack>
  ) : null;
}
