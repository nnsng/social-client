import { Box, Container } from '@mui/material';
import { Header } from '~/components/common';
import { LayoutProps } from '~/models';

export function HeaderOnlyLayout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </Box>
  );
}
