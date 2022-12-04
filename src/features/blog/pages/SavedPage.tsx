import { Grid, List, Pagination, Stack, Typography } from '@mui/material';
import { postApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NoPost } from 'components/common';
import { PostItemSkeleton } from 'components/skeletons';
import { usePageTitle } from 'hooks';
import { Post } from 'models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PostItem } from '../components';
import { postActions, selectPostLoading, selectSavedList, selectTotalPages } from '../postSlice';

export function SavedPage() {
  const { t } = useTranslation('savedPage');

  const dispatch = useAppDispatch();
  const savedList = useAppSelector(selectSavedList);
  const loading = useAppSelector(selectPostLoading);
  const totalPage = useAppSelector(selectTotalPages);

  const [page, setPage] = useState(1);

  usePageTitle(t('pageTitle'));

  useEffect(() => {
    fetchSavedList(page);
  }, [dispatch, page]);

  const handleUnsavePost = async (post: Post) => {
    await postApi.unsave(post._id as string);
    fetchSavedList(page);
  };

  const fetchSavedList = (page: number) => {
    dispatch(postActions.fetchSavedList({ page }));
  };

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Typography variant="h5" component="h2" fontWeight={600} textTransform="uppercase">
          {t('pageTitle')}
        </Typography>

        <List disablePadding>
          {loading ? (
            <PostItemSkeleton />
          ) : (
            <>
              {savedList.length > 0 ? (
                savedList.map((post) => (
                  <PostItem key={post._id} post={post} onUnsave={handleUnsavePost} />
                ))
              ) : (
                <NoPost />
              )}

              {totalPage > 1 && !loading && (
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
      </Grid>
    </Grid>
  );
}
