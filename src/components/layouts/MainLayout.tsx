import { Box, Container, Grid } from '@mui/material';
import { useCustomMediaQuery } from '~/hooks';
import { LayoutProps } from '~/models';
import { Header, Sidebar } from './components';

export function MainLayout({ children, maxWidth }: LayoutProps) {
  const mdUp = useCustomMediaQuery('up', 'md');

  return (
    <Box>
      <Header />

      <Box component="main" pt={2}>
        <Container maxWidth={maxWidth}>
          <Grid container spacing={mdUp ? 8 : 0}>
            {mdUp && (
              <Grid item xs={0} md={3}>
                <Sidebar />
              </Grid>
            )}

            <Grid item xs={12} md={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
