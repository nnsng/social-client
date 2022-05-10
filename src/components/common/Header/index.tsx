import { Avatar, Box, Container, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/blogSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { themeMixins, themeVariables } from 'utils/theme';
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
        ...themeMixins.paperBorder('bottom'),
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        height: themeVariables.headerHeight,
        mb: 2,
        py: 2,
        bgcolor: 'background.paper',
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
            <Stack alignItems="center" spacing={1} component={Link} to="/blog">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: 'primary.main',
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {APP_NAME[0]}
              </Avatar>

              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
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
