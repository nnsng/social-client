import { Box, Container, Grid } from '@mui/material';
import { LayoutProps } from '~/models';
import { Header, Sidebar } from './components';

export function MainLayout({ children, maxWidth }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Container maxWidth={maxWidth}>
          <Grid container spacing={{ xs: 0, md: 3, lg: 8 }}>
            <Grid item xs={0} md="auto" lg={3}>
              <Sidebar />
            </Grid>

            <Grid item xs={12} md={true} lg={9}>
              {children}
            </Grid>

            <Grid item xs={0} md={1} lg={0}></Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
