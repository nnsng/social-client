import { Avatar, Box, Stack } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { Link } from 'react-router-dom';
import { Brand, SearchBox } from '..';

export function HeaderDesktop() {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <Stack justifyContent="space-between" height="100%">
      <Brand />

      <SearchBox />

      <Box>
        <Link to={`/profile/${currentUser?.username}`}>
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.name}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
            }}
          />
        </Link>
      </Box>
    </Stack>
  );
}
