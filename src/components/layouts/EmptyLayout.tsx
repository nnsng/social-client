import { Box, Container } from '@mui/material';
import { Header, PageTitle } from 'components/common';
import { LayoutProps } from 'models';

export function EmptyLayout({ children, maxWidth }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Container maxWidth={maxWidth}>{children}</Container>
      </Box>
    </Box>
  );
}
