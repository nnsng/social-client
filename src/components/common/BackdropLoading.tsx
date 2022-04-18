import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export interface BackdropLoadingProps {
  open: boolean;
  onClose?: () => void;
}

export function BackdropLoading(props: BackdropLoadingProps) {
  const { open, onClose } = props;

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{ color: 'primary.main', bgcolor: 'background.default' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
