import { Box, Container } from '@mui/material';
import { LayoutProps } from '~/models';

export function EmptyLayout({ children, maxWidth }: LayoutProps) {
  return (
    <Box component="main">
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}
