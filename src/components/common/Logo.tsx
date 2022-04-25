import { Avatar, SxProps } from '@mui/material';
import React from 'react';

export interface ILogoProps {
  variant?: 'rounded' | 'square' | 'circular';
  sx?: SxProps;
}

export function Logo({ variant, sx }: ILogoProps) {
  return (
    <Avatar
      variant={variant ?? 'rounded'}
      sx={{
        bgcolor: 'primary.main',
        fontSize: 28,
        fontWeight: 600,
        ...sx,
      }}
    >
      1
    </Avatar>
  );
}
