import { Box, Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Header, Sidebar } from '~/components/common';
import { LayoutProps } from '~/models';

export const HIDE_SIDEBAR_PATHS = ['/blog/create', '/blog/edit'];

export function MainLayout(props: LayoutProps) {
  const { children, maxWidth, spacing = { md: 8 } } = props;

  const location = useLocation();

  const hideSidebar = HIDE_SIDEBAR_PATHS.some((path) => location.pathname.startsWith(path));

  return (
    <Box>
      <Header />

      <Box component="main">
        <Container maxWidth={maxWidth}>
          <Grid container spacing={spacing}>
            {!hideSidebar && (
              <Grid item xs={0} md={3}>
                <Sidebar />
              </Grid>
            )}

            <Grid item xs={12} md={hideSidebar ? 12 : 9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
