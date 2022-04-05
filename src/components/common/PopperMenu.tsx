import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import React from 'react';
import { themeConstants } from 'utils/theme';

export interface PopperMenuProps {
  open: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  children?: any;
  paperSx?: SxProps;
  zIndex?: number | ((theme: Theme) => number);
}

export function PopperMenu(props: PopperMenuProps) {
  const { open, anchorEl, onClose, children, paperSx, zIndex } = props;

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ zIndex }} transition>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              border: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
              borderColor: 'divider',
              boxShadow: themeConstants.boxShadow,
              overflow: 'hidden',
              ...paperSx,
            }}
          >
            <ClickAwayListener onClickAway={() => onClose?.()}>
              <MenuList disablePadding>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
