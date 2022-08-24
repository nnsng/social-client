import { SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/blogSlice';
import { LocationState } from 'models';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { themeMixins, themeVariables } from 'utils/theme';
import HeaderIconButton from './HeaderIconButton';
import Notification from './Notification';
import SearchBox from './SearchBox';
import UserMenu from './UserMenu';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const showHeaderMenu = !(location.state as LocationState)?.hideHeaderMenu;

  const loading = useAppSelector(selectPostLoading);

  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);

  const toggleSearchMobile = () => {
    setOpenSearchMobile(!openSearchMobile);
  };

  const handleHomeClick = () => {
    const event = new Event('homeClick');
    window.dispatchEvent(event);
    navigate('/blog');
  };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box
      component="header"
      sx={{
        ...themeMixins.paperBorder('bottom'),
        position: 'sticky',
        zIndex: 'appBar',
        top: 0,
        height: themeVariables.headerHeight,
        mb: 2,
        py: 2,
        borderRadius: 0,
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
            <Stack
              alignItems="center"
              spacing={0.8}
              onClick={handleHomeClick}
              sx={{ cursor: 'pointer' }}
            >
              <Avatar
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  fontSize: 28,
                  fontWeight: 600,
                  bgcolor: 'primary.main',
                  color: 'common.white',
                }}
              >
                {APP_NAME[0]}
              </Avatar>

              <Typography color="primary" fontSize={24} fontWeight={600}>
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
            {(showHeaderMenu || mdUp) && (
              <Stack alignItems="center" ml="auto">
                {smDown && location.pathname === '/blog' && (
                  <HeaderIconButton icon={<SearchRounded />} onClick={toggleSearchMobile} />
                )}

                <Notification />

                <UserMenu isOnMobile={smDown} />
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
