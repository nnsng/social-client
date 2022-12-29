import { Grid, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postApi } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { PostList } from '~/components/post';
import { usePageTitle } from '~/hooks';
import { Post } from '~/models';
import { postActions, selectPostList } from '~/redux/slices/postSlice';

export function SavedPage() {
  const { t } = useTranslation('savedPage');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);

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

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Typography variant="h5" component="h2" fontWeight={600} textTransform="uppercase">
          {t('pageTitle')}
        </Typography>

        <List disablePadding>
          <PostList
            postList={postList}
            page={page}
            onPageChange={setPage}
            onUnsave={handleUnsavePost}
            mode="saved"
          />
        </List>
      </Grid>
    </Grid>
  );
}
