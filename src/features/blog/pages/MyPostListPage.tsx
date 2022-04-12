import { Box, List, Pagination, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { Post } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { blogActions, selectPostList, selectTotalPages } from '../blogSlice';
import { PostItemMobile } from '../components/PostItemMobile';
import PostTable from '../components/PostTable';

export function MyPostListPage() {
  const navigate = useNavigate();

  const { t } = useTranslation('myPostList');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(blogActions.fetchMyPostList(filters));
  }, [dispatch, filters]);

  const handleEditPost = (post: Post) => {
    navigate(`/blog/edit/${post._id}`);
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
    dispatch(blogActions.fetchMyPostList(filters));
  };

  const handleChangePagination = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ ...filters, page });
  };

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <>
      <PageTitle title={t('pageTitle')} />

      <Box>
        <Typography variant="h4" fontWeight={500}>
          {t('pageTitle')}
        </Typography>

        {hideOnMobile ? (
          <Box mt={2}>
            <PostTable postList={postList} onEdit={handleEditPost} onRemove={handleRemovePost} />
          </Box>
        ) : (
          <List>
            {postList.map((post) => (
              <PostItemMobile
                key={post._id}
                post={post}
                onEdit={handleEditPost}
                onRemove={handleRemovePost}
              />
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
