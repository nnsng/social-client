import { Grid, List } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { PageTitle } from '~/components/common';
import { PostList } from '~/components/post';
import { usePageTitle } from '~/hooks';
import { Post } from '~/models';
import {
  postActions,
  selectPostList,
  selectPostLoading,
  selectTotalPages,
} from '~/store/slices/postSlice';

export function SavedPage() {
  const { t } = useTranslation('savedPage');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const [page, setPage] = useState(1);

  usePageTitle(t('pageTitle'));

  useEffect(() => {
    fetchSavedList(page);
  }, [dispatch, page]);

  const handleUnsavePost = async (post: Post) => {
    await postApi.unsave(post._id!);
    fetchSavedList(page);
  };

  const fetchSavedList = (page: number) => {
    dispatch(postActions.fetchSavedList({ page }));
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <PageTitle>{t('pageTitle')}</PageTitle>

        <List disablePadding>
          <PostList
            postList={postList}
            page={{
              total: totalPage,
              current: page,
            }}
            loading={loading}
            onPageChange={setPage}
            onUnsave={handleUnsavePost}
            mode="saved"
          />
        </List>
      </Grid>
    </Grid>
  );
}
