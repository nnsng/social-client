import { useFollowUser } from '@/hooks';
import { User } from '@/models';
import { themeVariables } from '@/utils/theme';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SuggestionItem } from './SuggestionItem';

interface SuggestionsProps {
  userList: Partial<User>[];
}

export function Suggestions({ userList }: SuggestionsProps) {
  const { t } = useTranslation('suggestions');

  const { follow } = useFollowUser();

  return (
    <Box pr={2} position="sticky" top={themeVariables.headerHeight + 16}>
      <Typography variant="subtitle2" fontWeight={600}>
        {t('title')}
      </Typography>

      <Divider />

      <List disablePadding>
        {userList.map((user) => (
          <ListItem key={user._id} disableGutters>
            <SuggestionItem item={user} onFollow={follow} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
