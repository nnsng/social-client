import { Box, Container, Grid } from '@mui/material';
import { Header, Sidebar } from '~/components/common';
import { HIDE_SIDEBAR_PATHS } from '~/constants';
import { LayoutProps } from '~/models';
import { useLocation } from 'react-router-dom';

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
