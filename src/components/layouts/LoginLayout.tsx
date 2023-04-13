import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import images from '~/assets/images';
import { themeMixins } from '~/utils/theme';

export function LoginLayout() {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${images.loginBackground})`,
        backgroundSize: 'cover',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          bgcolor: 'common.black',
          opacity: 0.5,
        },
      }}
    >
      <Box
        sx={{
          ...themeMixins.getPaperStyles(),
          borderRadius: { xs: 0, sm: 4 },
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 640,
          height: { xs: '100vh', sm: 'fit-content' },
          minHeight: 600,
          py: 6,
          px: { xs: 4, sm: 16 },
          m: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
