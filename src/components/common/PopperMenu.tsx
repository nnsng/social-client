import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';

export interface PopperMenuProps {
  open: boolean;
  anchorEl?: HTMLElement | null;
  onClose?: () => void;
  children?: any;
  paperSx?: SxProps;
  zIndex?: number;
}

export function PopperMenu(props: PopperMenuProps) {
  const { open, anchorEl, onClose, children, paperSx, zIndex } = props;

  return (
    <Popper open={open} anchorEl={anchorEl} transition placement="bottom-end" style={{ zIndex }}>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper elevation={0} sx={paperSx}>
            <ClickAwayListener onClickAway={() => onClose?.()}>
              <MenuList disablePadding>{children}</MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
