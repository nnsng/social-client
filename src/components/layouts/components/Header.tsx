import { Box, Container, LinearProgress, Stack } from '@mui/material';
import { useAppSelector } from '~/store/hooks';
import { useCustomMediaQuery } from '~/hooks';
import { selectPostLoading } from '~/store/slices/postSlice';
import { themeMixins, themeVariables } from '~/utils/theme';
import { Brand, SearchBox, SidebarMobileButton, UserActions } from '.';

export function Header() {
  const loading = useAppSelector(selectPostLoading);

  const mdUp = useCustomMediaQuery('up', 'md');

  return (
    <Box
      component="header"
      sx={{
        ...themeMixins.paperBorder('bottom'),
        position: 'sticky',
        zIndex: 'appBar',
        top: 0,
        height: themeVariables.headerHeight,
        borderRadius: 0,
      }}
    >
      {loading && (
        <Box position="absolute" top="0" width="100%">
          <LinearProgress sx={{ height: 3 }} />
        </Box>
      )}

      <Container sx={{ height: '100%' }}>
        <Stack justifyContent="space-between" height="100%" position="relative">
          <Stack spacing={2}>
            {!mdUp && <SidebarMobileButton />}
            <Brand />
          </Stack>

          <Stack spacing={2}>
            <SearchBox />
            <UserActions />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
