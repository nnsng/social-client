import { Stack } from '@mui/material';
import { Brand, SearchBox, UserActions } from '..';

export function HeaderDesktop() {
  return (
    <Stack justifyContent="space-between" height="100%">
      <Brand />

      <SearchBox />

      <UserActions />
    </Stack>
  );
}
