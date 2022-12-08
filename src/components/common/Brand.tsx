import { Avatar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '~/constants';

export function Brand() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const event = new Event('homeClick');
    window.dispatchEvent(event);
    navigate('/blog');
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

      <Typography color="primary" fontSize={24} fontWeight={600}>
        {APP_NAME}
      </Typography>
    </Stack>
  );
}
