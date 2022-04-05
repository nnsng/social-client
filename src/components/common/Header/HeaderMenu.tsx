import { SearchRounded } from '@mui/icons-material';
import { Hidden, PaletteMode, Stack } from '@mui/material';
import React from 'react';
import DrawerMobile from './DrawerMobile';
import HeaderIconButton from './HeaderIconButton';
import Notification from './Notification';
import ThemeSwitch from './ThemeSwitch';
import UserMenu from './UserMenu';

export interface HeaderMenuProps {
  toggleSearchMobile?: () => void;
  onThemeModeChange?: (mode: PaletteMode) => void;
}

export function HeaderMenu(props: HeaderMenuProps) {
  const { toggleSearchMobile, onThemeModeChange } = props;

  return (
    <Stack direction="row" alignItems="center" ml="auto">
      {/* Tablet & PC */}
      <Hidden smDown>
        <ThemeSwitch onChange={onThemeModeChange} />
        <Notification />
        <UserMenu />
      </Hidden>

      {/* Mobile */}
      <Hidden smUp>
        <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
        <ThemeSwitch />
        <Notification />
        <DrawerMobile />
      </Hidden>
    </Stack>
  );
}
