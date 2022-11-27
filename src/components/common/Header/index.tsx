import { Box, Container, LinearProgress, Theme, useMediaQuery } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectPostLoading } from 'features/blog/postSlice';
import { themeMixins, themeVariables } from 'utils/theme';
import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

export function Header() {
  const loading = useAppSelector(selectPostLoading);

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
        borderRadius: 0,
      }}
    >
      {loading && (
        <Box position="absolute" top="0" width="100%">
          <LinearProgress color="primary" sx={{ height: 3 }} />
        </Box>
      )}
      <Container sx={{ height: '100%' }}>{mdUp ? <HeaderDesktop /> : <HeaderMobile />}</Container>
    </Box>
  );
}
