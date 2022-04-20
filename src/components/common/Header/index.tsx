import { ArrowBackIosNewRounded } from '@mui/icons-material';
import { Box, Button, Container, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/blogSlice';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { themeVariables } from 'utils/theme';
import { Logo } from '..';
import { HeaderMenu } from './HeaderMenu';
import { SearchBox } from './SearchBox';

export function Header() {
  const { t } = useTranslation('header');

  const navigate = useNavigate();
  const location = useLocation();

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
        height: themeVariables.headerHeight,
        py: 2,
        bgcolor: 'background.paper',
        boxShadow: (theme) =>
          theme.palette.mode === 'light' ? themeVariables.boxShadow : undefined,
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
            <Stack alignItems="center" spacing={1}>
              <Link to="/">
                <Logo />
              </Link>

              {location.pathname === '/blog' ? (
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    letterSpacing: 1,
                    cursor: 'default',
                  }}
                >
                  {APP_NAME}
                </Typography>
              ) : (
                <Button
                  variant="text"
                  startIcon={<ArrowBackIosNewRounded />}
                  onClick={() => navigate(-1)}
                  sx={{
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    color: 'text.primary',
                    cursor: 'pointer',
                    ':hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '12px !important',
                      mr: -0.5,
                    },
                  }}
                >
                  {t('back')}
                </Button>
              )}
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
