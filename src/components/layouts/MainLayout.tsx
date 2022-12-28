import { Box, Container, Grid } from '@mui/material';
import { Header, Sidebar } from '~/components/common';
import { LayoutProps } from '~/models';

export function MainLayout({ children }: LayoutProps) {
  return (
    <Box>
      <Header />

      <Box component="main">
        <Container>
          <Grid container spacing={8}>
            <Grid item xs={0} md={3}>
              <Sidebar />
            </Grid>

            <Grid item xs={12} md={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
