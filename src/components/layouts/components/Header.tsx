import { Box, Container, LinearProgress, Stack } from '@mui/material';
import { useAppSelector } from '~/app/hooks';
import { useCustomMediaQuery } from '~/hooks';
import { selectPostLoading } from '~/redux/slices/postSlice';
import { themeMixins, themeVariables } from '~/utils/theme';
import { Brand, SearchBox, Sidebar, UserActions } from '.';

export function Header() {
  const loading = useAppSelector(selectPostLoading);

  const mdUp = useCustomMediaQuery('up', 'md');

  const headerElements = {
    mobile: [Sidebar, Brand, UserActions],
    desktop: [Brand, SearchBox, UserActions],
  };

  const headerChildren = mdUp ? headerElements.desktop : headerElements.mobile;

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
        <Stack justifyContent="space-between" height="100%">
          {headerChildren.map((Component, idx) => (
            <Component key={idx} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
