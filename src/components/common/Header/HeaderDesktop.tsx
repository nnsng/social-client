import { Stack } from '@mui/material';
import { Brand, SearchBox, UserProfile } from '..';

export function HeaderDesktop() {
  return (
    <Stack justifyContent="space-between" height="100%">
      <Brand />

      <SearchBox />

      <UserProfile />
    </Stack>
  );
}
