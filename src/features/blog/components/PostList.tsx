import { Box, List, ListItem, Pagination, Stack, Theme, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { NoPost } from 'components/common';
import { selectTotalPages } from 'features/blog/blogSlice';
import { IListParams, IPost } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';

export interface IPostListProps {
  postList: IPost[];
  loading?: boolean;
  page?: number;
  onPageChange?: (page: number) => void;
  onSave?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
  filter?: Partial<IListParams>;
  showTitle?: boolean;
  showPopup?: boolean;
}

export default function PostList(props: IPostListProps) {
  const {
    loading,
    postList,
    page,
    onPageChange,
    onSave,
    onRemove,
    filter,
    showTitle = true,
    showPopup = true,
  } = props;
  const { search, username, hashtag } = filter || {};
  const searchFilter = { search, username, hashtag };

  const { t } = useTranslation('postList');

  const totalPage = useAppSelector(selectTotalPages);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange?.(page);
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
      {showTitle && (
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
      )}

      <List disablePadding>
        {postList.length > 0
          ? postList.map((post) => (
              <ListItem disablePadding key={post._id}>
                <PostCard post={post} onSave={onSave} onRemove={onRemove} showPopup={showPopup} />
              </ListItem>
            ))
          : !loading && <NoPost createText={t('noPost.createText')}>{t('noPost.text')}</NoPost>}
      </List>

      {totalPage > 1 && !loading && (
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
    </Box>
  );
}
