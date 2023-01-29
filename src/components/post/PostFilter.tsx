import { MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ListParams, PostByTypes } from '~/models';

interface PostFilterProps {
  filter: Partial<ListParams>;
  onChange?: (newFilter: ListParams) => void;
}

export function PostFilter({ filter, onChange }: PostFilterProps) {
  const { search, username } = filter || {};
  const searchFilter = { search, username };

  const { t } = useTranslation('postFilter');

  const handleByFilterChange = (e: SelectChangeEvent<string>) => {
    const by = e.target.value as PostByTypes;
    onChange?.({ by });
  };

  const generateFilterText = () => {
    type SearchFilterKeyType = keyof typeof searchFilter;

    const filterKey = Object.keys(searchFilter).find(
      (x) => !!searchFilter[x as SearchFilterKeyType]
    );
    if (!filterKey) return t('text.newest');

    return t(`text.${filterKey}`, { value: searchFilter[filterKey as SearchFilterKeyType] });
  };

  return (
    <Stack justifyContent="space-between">
      <Typography
        variant="button"
        fontWeight={600}
        sx={{
          display: 'inline-block',
          borderColor: 'text.primary',
          cursor: 'default',
        }}
      >
        {generateFilterText()}
      </Typography>

      <Select
        size="small"
        variant="standard"
        value={filter.by}
        onChange={handleByFilterChange}
        sx={{
          '&::before, &::after': {
            content: 'unset',
          },
          '& .MuiSelect-select': {
            bgcolor: 'transparent !important',
            fontSize: '0.875rem',
            fontWeight: 600,
            py: 0,
            textTransform: 'uppercase',
          },
        }}
      >
        {['all', 'following'].map((by) => (
          <MenuItem key={by} value={by}>
            {t(`filter.${by}`)}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}
