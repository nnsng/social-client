import { Box, Stack } from '@mui/material';
import background from 'assets/images/background.png';
import { LayoutProps } from 'models';
import { themeMixins } from 'utils/theme';

export function AuthLayout({ children }: LayoutProps) {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
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
          ...themeMixins.paperBorder(),
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
        {children}
      </Box>
    </Stack>
  );
}
