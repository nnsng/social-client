import { Box, Container, Grid, Hidden } from '@mui/material';
import postApi from 'api/postApi';
import { Post, Tag } from 'models';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostList from '../components/PostList';
import PostRecommend from '../components/PostRecommend';
import { postActions, selectPostList } from '../postSlice';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const tagActive = params.get('tag');

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);

  const [pageNum, setPageNum] = useState<number>(1);

  const handleTagClick = (tag: Tag) => {
    navigate(`?tag=${tag.value}`);
  };

  const handleSavePost = async (post: Post) => {
    try {
      await postApi.save(post._id as string);
      toast.success('Đã lưu');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRemovePost = async (post: Post) => {
    await postApi.remove(post._id as string);
    dispatch(postActions.fetchPostList({ page: pageNum }));
  };

  useEffect(() => {
    if (tagActive) {
      dispatch(postActions.fetchPostList({ tag: tagActive, page: pageNum }));
    } else {
      dispatch(postActions.fetchPostList({ page: pageNum }));
    }
  }, [dispatch, tagActive, pageNum]);

  return (
    <Container>
      <Grid container spacing={{ xs: 0, lg: 10 }}>
        <Grid item xs={12} md={10} lg={7} sx={{ m: '0 auto' }}>
          <Box component="section">
            <PostList
              postList={postList}
              onSavePost={handleSavePost}
              onRemovePost={handleRemovePost}
              page={pageNum}
              onPageChange={setPageNum}
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
              <PostRecommend tagActive={tagActive || ''} onTagClick={handleTagClick} />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}
