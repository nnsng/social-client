import { SearchRounded } from '@mui/icons-material';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import AppearanceDialog from './AppearanceDialog';
import HeaderIconButton from './HeaderIconButton';
import Notification from './Notification';
import UserMenu from './UserMenu';

export interface IHeaderMenuProps {
  toggleSearchMobile?: () => void;
}

export function HeaderMenu({ toggleSearchMobile }: IHeaderMenuProps) {
  const isOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack alignItems="center" ml="auto">
      {isOnMobile && <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />}

      <Notification />

      <UserMenu isOnMobile={isOnMobile} />

      <AppearanceDialog />
    </Stack>
  );
}
