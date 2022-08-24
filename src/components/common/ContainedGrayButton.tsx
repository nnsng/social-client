import { Button, ButtonProps } from '@mui/material';

export interface ContainedGrayButtonProps extends ButtonProps {}

export function ContainedGrayButton(props: ContainedGrayButtonProps) {
  const { children, sx, ...rest } = props;

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
      {...rest}
    >
      {children}
    </Button>
  );
}
