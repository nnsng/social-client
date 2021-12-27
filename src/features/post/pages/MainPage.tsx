import { Box, Container, Grid, Hidden } from '@mui/material';
import postApi from 'api/postApi';
import { ListParams, Post, Tag } from 'models';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostList from '../components/PostList';
import PostRecommend from '../components/PostRecommend';
import { postActions, selectPostList } from '../postSlice';
import queryString from 'query-string';

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
    document.title = 'Blog App';
  }, []);

  useEffect(() => {
    navigate(`?${queryString.stringify(filter)}`);
    dispatch(postActions.fetchPostList(filter));
  }, [dispatch, filter]);

  const handleTagClick = (tag: Tag) => {
    setFilter({ ...filter, tag: tag.value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page });
  };

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
    dispatch(postActions.fetchPostList(filter));
  };

  return (
    <Container>
      <Grid container spacing={{ xs: 0, lg: 10 }}>
        <Grid item xs={12} md={10} lg={7} sx={{ m: '0 auto' }}>
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

        <Grid item lg={5}>
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
              <PostRecommend tagActive={filter.tag} onTagClick={handleTagClick} />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}
