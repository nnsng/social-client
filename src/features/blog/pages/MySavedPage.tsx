import { Box, Container, List, Pagination, Stack, Typography } from '@mui/material';
import { postApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NoPost, PageTitle } from 'components/common';
import { PostItemSkeleton } from 'components/skeletons';
import { Post } from 'models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PostItem from '../components/PostItem';
import { postActions, selectPostLoading, selectSavedList, selectTotalPages } from '../postSlice';

export function MySavedPage() {
  const { t } = useTranslation('saved');

  const dispatch = useAppDispatch();
  const savedList = useAppSelector(selectSavedList);
  const loading = useAppSelector(selectPostLoading);
  const totalPage = useAppSelector(selectTotalPages);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchSavedList(page);
  }, [dispatch, page]);

  const handleUnSavePost = async (post: Post) => {
    await postApi.unSave(post._id as string);
    fetchSavedList(page);
  };

  const fetchSavedList = (page: number) => {
    dispatch(postActions.fetchSavedList({ page }));
  };

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  return (
    <Container maxWidth="md">
      <PageTitle title={t('pageTitle')} />

      <Box>
        <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={600} textTransform="uppercase">
          {t('pageTitle')}
        </Typography>

        <List disablePadding>
          {loading ? (
            <PostItemSkeleton />
          ) : (
            <>
              {savedList.length > 0 ? (
                savedList.map((post) => (
                  <PostItem key={post._id} post={post} onUnSave={handleUnSavePost} />
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
      </Box>
    </Container>
  );
}
