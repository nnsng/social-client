import { Box, Container } from '@mui/material';
import { LayoutProps } from '~/models';

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <Box component="main">
      <Container>{children}</Container>
    </Box>
  );
}
