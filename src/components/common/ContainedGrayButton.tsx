import { Button, SxProps, Theme, ButtonBaseProps, ExtendButtonBase } from '@mui/material';
import React from 'react';

export interface IContainedGrayButtonProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;

  [key: string]: any;
}

export function ContainedGrayButton(props: IContainedGrayButtonProps) {
  const { children, sx, onClick, ...rest } = props;

  return (
    <Button
      sx={{
        color: 'text.primary',
        bgcolor: 'action.hover',
        '&:hover': {
          bgcolor: 'action.selected',
        },
        ...sx,
      }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}
