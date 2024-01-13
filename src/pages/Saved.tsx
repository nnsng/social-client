import { Grid, List } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postApi } from '~/api';
import { PageTitle } from '~/components/common';
import { PostList } from '~/components/post';
import { usePageTitle } from '~/hooks/common';
import { usePostList } from '~/hooks/queries';
import { Post } from '~/models';
import { useAppDispatch } from '~/store/hooks';
import { fetchSavedList } from '~/store/slices/postSlice';

export function SavedPage() {
  const { t } = useTranslation('savedPage');

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const {
    data: {
      data: postList,
      pagination: { totalPage },
    },
    isLoading,
  } = usePostList({ saved: true, page });

  usePageTitle(t('pageTitle'));

  const handleUnsavePost = async (post: Post) => {
    await postApi.unsave(post._id!);
    dispatch(fetchSavedList({ page }));
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <PageTitle>{t('pageTitle')}</PageTitle>

        <List disablePadding>
          <PostList
            postList={postList}
            page={{
              total: totalPage || 1,
              current: page,
            }}
            loading={isLoading}
            onPageChange={setPage}
            onUnsave={handleUnsavePost}
            mode="saved"
          />
        </List>
      </Grid>
    </Grid>
  );
}
