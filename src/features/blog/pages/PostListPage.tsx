import { Box, List, Pagination, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { IPost } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { blogActions, selectPostList, selectTotalPages } from '../blogSlice';
import { PostItemMobile } from '../components/PostItemMobile';
import PostTable from '../components/PostTable';

export interface IPostListPageProps {
  mode?: 'my' | 'saved';
}

export function PostListPage({ mode }: IPostListPageProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('postList');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const isSavedPage = mode === 'saved';

  useEffect(() => {
    setFilters({
      page: 1,
      limit: 10,
    });
  }, [mode]);

  useEffect(() => {
    if (isSavedPage) {
      dispatch(blogActions.fetchSavedPostList(filters));
    } else {
      dispatch(blogActions.fetchMyPostList(filters));
    }
  }, [dispatch, filters]);

  const handleUnSavePost = async (post: IPost) => {
    await postApi.unSave(post._id as string);
    dispatch(blogActions.fetchSavedPostList(filters));
  };

  const handleEditPost = (post: IPost) => {
    navigate(`/blog/edit/${post._id}`);
  };

  const handleRemovePost = async (post: IPost) => {
    await postApi.remove(post._id as string);
    dispatch(blogActions.fetchMyPostList(filters));
  };

  const handlePaginationChange = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ ...filters, page });
  };

  const hideOnMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <>
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Box>
        <Typography variant="h4" fontWeight={500}>
          {t(`pageTitle.${mode}`)}
        </Typography>

        {hideOnMobile ? (
          <Box mt={2}>
            <PostTable
              postList={postList}
              saved={isSavedPage}
              onUnSave={handleUnSavePost}
              onEdit={handleEditPost}
              onRemove={handleRemovePost}
            />
          </Box>
        ) : (
          <List>
            {postList.map((post) => (
              <PostItemMobile
                key={post._id}
                post={post}
                saved={isSavedPage}
                onUnSave={handleUnSavePost}
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
              onChange={handlePaginationChange}
            />
          </Stack>
        )}
      </Box>
    </>
  );
}
