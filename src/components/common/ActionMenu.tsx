import { Drawer, MenuList, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import { PopperMenu, IPopperMenuProps } from '.';

export interface IActionMenuProps extends IPopperMenuProps {}

export function ActionMenu(props: IActionMenuProps) {
  const { open, anchorEl, onClose, children, paperSx, zIndex } = props;

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return hideOnMobile ? (
    <PopperMenu open={open} anchorEl={anchorEl} paperSx={paperSx} zIndex={zIndex} onClose={onClose}>
      {children}
    </PopperMenu>
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
