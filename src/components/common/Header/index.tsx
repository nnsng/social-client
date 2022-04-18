import { Box, Container, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/blogSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { themeConstants } from 'utils/theme';
import { Logo } from '..';
import { HeaderMenu } from './HeaderMenu';
import { SearchBox } from './SearchBox';

export function Header() {
  const loading = useAppSelector(selectPostLoading);

  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);

  const toggleSearchMobile = () => {
    setOpenSearchMobile(!openSearchMobile);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        height: themeConstants.headerHeight,
        py: 2,
        bgcolor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'light' ? themeConstants.boxShadow : undefined,
        borderBottom: (theme) => (theme.palette.mode === 'dark' ? 1 : undefined),
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'divider' : undefined),
      }}
    >
      {loading && (
        <Box position="absolute" top="0" width="100%">
          <LinearProgress color="primary" sx={{ height: 3 }} />
        </Box>
      )}

      <Container>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs="auto" mr={2}>
            <Stack alignItems="center" component={Link} to="/blog">
              <Logo />

              <Typography variant="h6" color="primary" fontWeight={600} letterSpacing={1} ml={1}>
                {APP_NAME}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs>
            <SearchBox
              openSearchMobile={openSearchMobile}
              toggleSearchMobile={toggleSearchMobile}
            />
          </Grid>

          <Grid item xs="auto">
            <HeaderMenu toggleSearchMobile={toggleSearchMobile} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
