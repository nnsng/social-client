import { Drawer, Hidden, MenuList } from '@mui/material';
import React from 'react';
import { themeConstants } from 'utils/theme';
import { PopperMenu, PopperMenuProps } from '.';

export interface ActionMenuProps extends PopperMenuProps {}

export function ActionMenu(props: ActionMenuProps) {
  const { open, anchorEl, onClose, children, paperSx, zIndex } = props;

  return (
    <>
      <Hidden smDown>
        <PopperMenu
          open={open}
          anchorEl={anchorEl}
          paperSx={{
            boxShadow: themeConstants.boxShadow,
            overflow: 'hidden',
            ...paperSx,
          }}
          zIndex={zIndex}
          onClose={onClose}
        >
          {children}
        </PopperMenu>
      </Hidden>

      <Hidden smUp>
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
      </Hidden>
    </>
  );
}
