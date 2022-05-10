// @ts-nocheck
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import React from 'react';
import { themeMixins } from 'utils/theme';

export interface IPopperMenuProps {
  open: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  children?: any;
  paperSx?: SxProps;
  zIndex?: number | ((theme: Theme) => number);
}

export function PopperMenu(props: IPopperMenuProps) {
  const { open, anchorEl, onClose, children, paperSx, zIndex } = props;

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end" sx={{ zIndex }} transition>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              ...themeMixins.paperBorder(),
              ...paperSx,
              overflow: 'hidden',
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
