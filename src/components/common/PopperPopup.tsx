// @ts-nocheck
import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  Theme,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { themeMixins } from 'utils/theme';

export type AnchorEl = PopperProps['anchorEl'];

export interface PopperPopupProps {
  open: boolean;
  anchorEl?: AnchorEl;
  placement?: PopperPlacementType;
  onClose?: () => void;
  children?: any;
  sx?: SxProps<Theme>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function PopperPopup(props: PopperPopupProps) {
  const {
    open,
    anchorEl,
    placement = 'bottom-end',
    onClose,
    children,
    sx,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const { zIndex, ...paperSx } = sx || {};

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      sx={{ zIndex }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transition
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              ...themeMixins.paperBorder(),
              ...paperSx,
              overflow: 'hidden',
            }}
          >
            <ClickAwayListener onClickAway={onClose}>
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
