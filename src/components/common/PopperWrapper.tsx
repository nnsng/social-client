import { Box, ClickAwayListener, Grow, Paper, Popper, PopperProps } from '@mui/material';
import { ReactNode } from 'react';
import { themeMixins } from '~/utils/theme';

export interface PopperWrapperProps extends PopperProps {
  onClose?: () => void;
  children: ReactNode;
}

export function PopperWrapper(props: PopperWrapperProps) {
  const { onClose, children, placement = 'bottom-end', ...rest } = props;

  return (
    <Popper placement={placement} transition {...rest}>
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              ...themeMixins.getPaperStyles(),
              overflow: 'hidden',
            }}
          >
            <ClickAwayListener onClickAway={() => onClose?.()}>
              <Box>{children}</Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
