import { Box, Container, Hidden, List, Pagination, Stack, Typography } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { Post } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostItemMobile } from '../components/PostItemMobile';
import PostTable from '../components/PostTable';
import { blogActions, selectPostList, selectTotalPages } from '../blogSlice';

export function MyPostListPage() {
  const navigate = useNavigate();

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

  return (
    <>
      <PageTitle title="Bài viết của tôi" />

      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="500" sx={{ userSelect: 'none' }}>
          Bài viết của tôi
        </Typography>

        <Hidden smDown>
          <Box mt={2}>
            <PostTable postList={postList} onEdit={handleEditPost} onRemove={handleRemovePost} />
          </Box>
        </Hidden>

        <Hidden smUp>
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
        </Hidden>

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
      </Container>
    </>
  );
}
