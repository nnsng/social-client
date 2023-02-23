import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { LayoutProps } from '~/models';
import { Header } from './components';

export function HeaderOnlyLayout({ maxWidth }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Container maxWidth={maxWidth}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
