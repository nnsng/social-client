import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import React from 'react';

export interface IContainedInputProps extends OutlinedInputProps {}

export function ContainedInput({ sx, ...props }: IContainedInputProps) {
  return (
    <OutlinedInput
      sx={{
        borderRadius: 40,
        bgcolor: 'action.selected',
        '& fieldset': {
          border: '0 !important',
        },
        ...sx,
      }}
      {...props}
    />
  );
}
