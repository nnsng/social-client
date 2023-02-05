import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

export const GrayButton = forwardRef((props: ButtonProps, ref: ButtonProps['ref']) => {
  return (
    <Button
      {...props}
      ref={ref}
      sx={{
        color: 'text.primary',
        bgcolor: 'action.hover',
        '&:hover': {
          bgcolor: 'action.selected',
          ...(props.sx as any)?.['&:hover'],
        },
        ...props.sx,
      }}
    />
  );
});
