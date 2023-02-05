import { SearchRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function SearchBoxMobile() {
  const navigate = useNavigate();

  return (
    <IconButton sx={{ bgcolor: 'action.hover' }} onClick={() => navigate('/search')}>
      <SearchRounded />
    </IconButton>
  );
}
