import { Box, Container } from '@mui/material';
import { LayoutProps } from '~/models';
import { Header } from './components';

export function HeaderOnlyLayout({ children, maxWidth }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Container maxWidth={maxWidth}>{children}</Container>
      </Box>
    </Box>
  );
}
