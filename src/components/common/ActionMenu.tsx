import { Drawer, MenuList, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import { PopperPopup, IPopperPopupProps } from '.';

export interface IActionMenuProps extends IPopperPopupProps {}

export function ActionMenu(props: IActionMenuProps) {
  const { open, anchorEl, onClose, children, sx } = props;

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return hideOnMobile ? (
    <PopperPopup open={open} anchorEl={anchorEl} sx={sx} onClose={onClose}>
      <MenuList disablePadding>{children}</MenuList>
    </PopperPopup>
  ) : (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        },
      }}
    >
      <MenuList
        sx={{
          '& .MuiMenuItem-root': {
            px: 3,
          },
        }}
      >
        {children}
      </MenuList>
    </Drawer>
  );
}
