import { Container, Grid } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { IListParams, IPost } from 'models';
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

  const [filter, setFilter] = useState<IListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, ...params };
  });

  useEffect(() => {
    navigate(`?${queryString.stringify(filter)}`, { replace: true });
    dispatch(blogActions.fetchPostList(filter));
  }, [dispatch, filter]);

  const handleKeywordClick = (keyword: string) => {
    setFilter({ ...filter, keyword, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page });
  };

  const handleSavePost = async (post: IPost) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: IPost) => {
    await postApi.remove(post._id as string);
    dispatch(blogActions.fetchPostList(filter));
  };

  return (
    <Container>
      <PageTitle title={APP_NAME} />

      <Grid
        container
        spacing={{ xs: 2, lg: 8 }}
        flexDirection={{ xs: 'column-reverse', lg: 'row' }}
      >
        <Grid item xs={12} md={10} lg width="100%" mx="auto">
          <PostList
            postList={postList}
            onSave={handleSavePost}
            onRemove={handleRemovePost}
            page={Number(filter.page) || 1}
            onPageChange={handlePageChange}
          />
        </Grid>

        <Grid item xs={12} md={10} lg={4} width="100%" mx="auto">
          <PostRecommend keywordActive={filter.keyword} onKeywordClick={handleKeywordClick} />
        </Grid>
      </Grid>
    </Container>
  );
}
