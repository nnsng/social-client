import { SearchRounded } from '@mui/icons-material';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import { ILocationState } from 'models';
import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderIconButton from './HeaderIconButton';
import UserMenu from './UserMenu';

export interface IHeaderMenuProps {
  toggleSearchMobile?: () => void;
}

export function HeaderMenu({ toggleSearchMobile }: IHeaderMenuProps) {
  const location = useLocation();
  const showHeaderMenu = !(location.state as ILocationState)?.hideHeaderMenu;

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return showHeaderMenu || mdUp ? (
    <Stack alignItems="center" ml="auto">
      {smDown && location.pathname === '/blog' && (
        <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
      )}

      {/* <Notification /> */}

      <UserMenu isOnMobile={smDown} />
    </Stack>
  ) : null;
}
