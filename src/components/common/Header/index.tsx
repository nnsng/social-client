import {
  Avatar,
  Box,
  Container,
  Grid,
  LinearProgress,
  PaletteMode,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/blogSlice';
import { themeActions } from 'features/common/themeSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { themeConstants } from 'utils/theme';
import { HeaderMenu } from './HeaderMenu';
import { SearchBox } from './SearchBox';

export function Header() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);

  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);

  const toggleSearchMobile = () => {
    setOpenSearchMobile(!openSearchMobile);
  };

  const changeThemeMode = (mode: PaletteMode) => {
    dispatch(themeActions.changeThemeMode(mode));
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
        userSelect: 'none',
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'background.default' : 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'light' ? themeConstants.boxShadow : undefined,
        border: (theme) => (theme.palette.mode === 'dark' ? 1 : undefined),
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
            <Stack direction="row" alignItems="center" component={Link} to="/">
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: 'primary.main',
                  mr: 1,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                1
              </Avatar>

              <Typography variant="h6" color="primary" fontWeight="600" letterSpacing={1}>
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
            <HeaderMenu toggleSearchMobile={toggleSearchMobile} onThemeChange={changeThemeMode} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
