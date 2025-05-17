import { APP_NAME } from '@/constants';
import { Avatar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function Brand() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const event = new Event('homeClick');
    window.dispatchEvent(event);
    navigate('/');
  };

  return (
    <Stack alignItems="center" onClick={handleHomeClick} sx={{ cursor: 'pointer' }}>
      <Avatar
        sx={{
          display: { xs: 'none', md: 'flex' },
          mr: 2,
          fontSize: 28,
          fontWeight: 600,
          bgcolor: 'primary.main',
          color: 'common.white',
        }}
      >
        {APP_NAME[0]}
      </Avatar>

      <Typography
        color="primary"
        fontSize={24}
        fontWeight={600}
        sx={{
          position: { xs: 'absolute', md: 'relative' },
          top: { xs: '50%', md: 0 },
          left: { xs: '50%', md: 0 },
          transform: { xs: 'translate(-50%, -50%)', md: 'translate(0)' },
        }}
      >
        {APP_NAME}
      </Typography>
    </Stack>
  );
}
