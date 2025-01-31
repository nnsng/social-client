import { useCustomMediaQuery } from '@/hooks';
import { LayoutProps } from '@/models';
import { Box, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from './components';

export function MainLayout({ maxWidth }: LayoutProps) {
  const mdDown = useCustomMediaQuery('down', 'md');

  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Container maxWidth={maxWidth}>
          <Grid container spacing={{ xs: 0, md: 3, lg: 8 }}>
            <Grid item xs={0} md="auto" lg={3}>
              <Sidebar type="normal" />
            </Grid>

            <Grid item xs={12} md lg={9}>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
