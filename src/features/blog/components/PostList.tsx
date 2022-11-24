import {
  Box,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { NoPost } from 'components/common';
import { PostCardSkeleton } from 'components/skeletons';
import { selectPostLoading, selectTotalPages } from 'features/blog/postSlice';
import { ListParams, Post, PostByType } from 'models';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';

export interface PostListProps {
  postList: Post[];
  page?: number;
  filter?: Partial<ListParams>;
  onFilterChange?: (newFilter: ListParams) => void;
  onSave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  isHomePage?: boolean;
}

export default function PostList(props: PostListProps) {
  const { postList, page, filter, onFilterChange, onSave, onDelete, isHomePage = true } = props;
  const { search, username, hashtag } = filter || {};
  const searchFilter = { search, username, hashtag };

  const { t } = useTranslation('postList');

  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const handlePageChange = (event: any, page: number) => {
    onFilterChange?.({ page });
  };

  const handleByFilterChange = (e: SelectChangeEvent<string>) => {
    const by = e.target.value as PostByType;
    onFilterChange?.({ by });
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
    <Box width="100%">
      {isHomePage && (
        <Stack alignItems="center" justifyContent="space-between">
          <Typography
            variant="button"
            color="text.primary"
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
            value={filter?.by ?? 'all'}
            onChange={handleByFilterChange}
            sx={{
              '&::before, &::after': {
                content: 'unset',
              },
              '& .MuiSelect-select': {
                bgcolor: 'transparent !important',
                fontSize: 14,
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
      )}

      <List disablePadding>
        {loading ? (
          <ListItem disablePadding>
            <PostCardSkeleton />
          </ListItem>
        ) : (
          <>
            {postList.length > 0 ? (
              postList.map((post) => (
                <ListItem key={post._id} disablePadding>
                  <PostCard
                    post={post}
                    showPopup={isHomePage}
                    onSave={onSave}
                    onDelete={onDelete}
                  />
                </ListItem>
              ))
            ) : (
              <NoPost />
            )}

            {totalPage > 1 && (
              <Stack mb={2}>
                <Pagination
                  shape="rounded"
                  color="primary"
                  count={totalPage}
                  page={page}
                  onChange={handlePageChange}
                  sx={{ m: 'auto' }}
                />
              </Stack>
            )}
          </>
        )}
      </List>
    </Box>
  );
}
