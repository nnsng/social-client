import { Box, Container, List, Pagination, Stack, Typography } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { IListParams, IPost } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { blogActions, selectPostList, selectTotalPages } from '../blogSlice';
import { PostItem } from '../components/PostItem';

export interface IMyPostListPageProps {
  mode?: 'my' | 'saved';
}

export function MyPostListPage({ mode }: IMyPostListPageProps) {
  const isSavedPage = mode === 'saved';

  const navigate = useNavigate();

  const { t } = useTranslation('postList');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);

  const [filters, setFilters] = useState<IListParams>({});

  useEffect(() => {
    setFilters({
      page: 1,
      limit: 10,
    });
  }, [mode]);

  useEffect(() => {
    if (Object.keys(filters).length === 0) return;

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

  return (
    <Container maxWidth="md">
      <PageTitle title={t(`pageTitle.${mode}`)} />

      <Box>
        <Typography variant="h4" fontWeight={500}>
          {t(`pageTitle.${mode}`)}
        </Typography>

        <List>
          {postList.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              saved={isSavedPage}
              onUnSave={handleUnSavePost}
              onEdit={handleEditPost}
              onRemove={handleRemovePost}
            />
          ))}
        </List>

        {totalPage > 1 && (
          <Stack mb={2}>
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
    </Container>
  );
}
