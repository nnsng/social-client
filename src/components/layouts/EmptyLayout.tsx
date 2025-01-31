import { LayoutProps } from '@/models';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export function EmptyLayout({ maxWidth }: LayoutProps) {
  return (
    <Box component="main">
      <Container maxWidth={maxWidth}>
        <Outlet />
      </Container>
    </Box>
  );
}
