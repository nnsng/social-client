import { Box, Grid } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { Keyword, ListParams, Post } from 'models';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostList } from '../blogSlice';
import PostList from '../components/PostList';
import PostRecommend from '../components/PostRecommend';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);

  const [filter, setFilter] = useState<ListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, ...params };
  });

  useEffect(() => {
    navigate(`?${queryString.stringify(filter)}`, { replace: true });
    dispatch(blogActions.fetchPostList(filter));
  }, [dispatch, filter]);

  const handleKeywordClick = (keyword: Keyword) => {
    setFilter({ ...filter, keyword: keyword.value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page });
  };

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
    dispatch(blogActions.fetchPostList(filter));
  };

  return (
    <>
      <PageTitle title={APP_NAME} />

      <Box mt={3}>
        <Grid
          container
          item
          xs
          md={10}
          lg
          sx={{
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            mx: 'auto',
          }}
        >
          <Grid item xs sx={{ width: '100%', mx: 'auto' }}>
            <Box component="section">
              <PostList
                postList={postList}
                onSave={handleSavePost}
                onRemove={handleRemovePost}
                page={Number(filter.page) || 1}
                onPageChange={handlePageChange}
              />
            </Box>
          </Grid>

          <Grid item xs="auto">
            <Box
              component="section"
              sx={{
                position: 'sticky',
                top: 96,
                maxWidth: { lg: 350 },
                ml: { lg: 8 },
                mt: { xs: -2, lg: 0 },
                mb: { xs: 2, lg: 0 },
              }}
            >
              <PostRecommend keywordActive={filter.keyword} onKeywordClick={handleKeywordClick} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
