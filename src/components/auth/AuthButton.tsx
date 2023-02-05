import { Button, ButtonProps } from '@mui/material';

export function AuthButton(props: ButtonProps) {
  const { children, sx, ...restProps } = props;

  return (
    <Button
      color="primary"
      fullWidth
      sx={{
        height: 47,
        mt: '12px !important',
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
}
