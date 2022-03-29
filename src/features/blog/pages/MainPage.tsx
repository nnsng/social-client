import { Box, Container, Grid } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { ListParams, Post } from 'models';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostList } from '../blogSlice';
import PostList from '../components/PostList';

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
    navigate(`?${queryString.stringify(filter)}`);
    dispatch(blogActions.fetchPostList(filter));
  }, [dispatch, filter]);

  // const handleKeywordClick = (keyword: Keyword) => {
  //   setFilter({ ...filter, keyword: keyword.value, page: 1 });
  // };

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

      <Container>
        <Grid container spacing={{ xs: 0, lg: 10 }}>
          <Grid item xs={12} md={10} lg={8} sx={{ m: '0 auto' }}>
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

          {/* <Grid item lg={5}>
            <Hidden lgDown>
              <Box
                component="section"
                sx={{
                  position: 'sticky',
                  top: 96,
                  pl: 10,

                  '::before': {
                    content: '""',
                    position: 'absolute',
                    top: -96,
                    left: 0,
                    height: '100vh',
                    borderLeft: 1,
                    borderColor: 'divider',
                  },
                }}
              >
                <PostRecommend keywordActive={filter.keyword} onKeywordClick={handleKeywordClick} />
              </Box>
            </Hidden>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
