import { Typography } from '@mui/material';

interface PageTitleProps {
  children: string;
  uppercase?: boolean;
}

export function PageTitle({ children, uppercase = true }: PageTitleProps) {
  return (
    <Typography
      variant="h5"
      component="h2"
      mb={2}
      fontWeight={600}
      textTransform={uppercase ? 'uppercase' : 'none'}
    >
      {children}
    </Typography>
  );
}
