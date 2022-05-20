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
import { selectPostLoading, selectTotalPages } from 'features/blog/blogSlice';
import { IListParams, IPost, PostByType } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';

export interface IPostListProps {
  postList: IPost[];
  page?: number;
  filter?: Partial<IListParams>;
  onFilterChange?: (newFilter: IListParams) => void;
  isHomePage?: boolean;

  // postCardProps
  onSave?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
}

export default function PostList(props: IPostListProps) {
  const { postList, page, filter, onFilterChange, isHomePage = true, ...postCardProps } = props;
  const { search, username, hashtag } = filter || {};
  const searchFilter = { search, username, hashtag };

  const { t } = useTranslation('postList');

  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
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
    <Box sx={{ width: '100%' }}>
      {isHomePage && (
        <Stack alignItems="center" justifyContent="space-between">
          <Typography
            variant="button"
            sx={{
              display: 'inline-block',
              borderColor: 'text.primary',
              color: 'text.primary',
              fontWeight: 600,
              cursor: 'default',
            }}
          >
            {generateFilterText()}
          </Typography>

          <Select
            size="small"
            variant="standard"
            value={filter?.by ?? 'all'}
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
            onChange={handleByFilterChange}
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
                  <PostCard post={post} showPopup={isHomePage} {...postCardProps} />
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
                  sx={{ m: 'auto' }}
                  onChange={handlePageChange}
                />
              </Stack>
            )}
          </>
        )}
      </List>
    </Box>
  );
}
