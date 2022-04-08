import { SearchRounded } from '@mui/icons-material';
import { PaletteMode, Stack, Theme, useMediaQuery } from '@mui/material';
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

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Stack direction="row" alignItems="center" ml="auto">
      {hideOnMobile ? (
        <>
          <ThemeSwitch onChange={onThemeModeChange} />
          <Notification />
          <UserMenu />
        </>
      ) : (
        <>
          <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
          <ThemeSwitch onChange={onThemeModeChange} />
          <Notification />
          <DrawerMobile />
        </>
      )}
    </Stack>
  );
}
