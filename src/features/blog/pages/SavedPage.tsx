import { Box, List, Pagination, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { Post } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogActions, selectPostList, selectTotalPages } from '../blogSlice';
import { PostItemMobile } from '../components/PostItemMobile';
import PostTable from '../components/PostTable';

export function SavedPage() {
  const { t } = useTranslation('saved');

  const dispatch = useAppDispatch();
  const savedPostList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(blogActions.fetchSavedPostList(filters));
  }, [dispatch, filters]);

  const handleUnSavePost = async (post: Post) => {
    await postApi.unSave(post._id as string);
    dispatch(blogActions.fetchSavedPostList(filters));
  };

  const handleChangePagination = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ ...filters, page });
  };

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <>
      <PageTitle title={t('pageTitle')} />

      <Box>
        <Typography variant="h4" fontWeight="500" sx={{ userSelect: 'none' }}>
          {t('pageTitle')}
        </Typography>

        {hideOnMobile ? (
          <Box mt={2}>
            <PostTable postList={savedPostList} saved onUnSave={handleUnSavePost} />
          </Box>
        ) : (
          <List>
            {savedPostList.map((post) => (
              <PostItemMobile key={post._id} post={post} onUnSave={handleUnSavePost} saved />
            ))}
          </List>
        )}

        {totalPage > 1 && (
          <Stack my={2}>
            <Pagination
              shape="rounded"
              color="primary"
              count={totalPage}
              page={filters.page}
              sx={{ m: 'auto' }}
              onChange={handleChangePagination}
            />
          </Stack>
        )}
      </Box>
    </>
  );
}
