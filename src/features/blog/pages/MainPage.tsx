import { Container, Grid } from '@mui/material';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { IListParams, IPost } from 'models';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostList, selectPostLoading } from '../blogSlice';
import PostList from '../components/PostList';
import TopHashtags from '../components/TopHashtags';
import configApi from 'api/configApi';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const loading = useAppSelector(selectPostLoading);

  const [filter, setFilter] = useState<IListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, ...params };
  });
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilter({ page: 1, ...params });
  }, [location.search]);

  useEffect(() => {
    navigate(`?${queryString.stringify(filter)}`, { replace: true });
    dispatch(blogActions.fetchPostList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    (async () => {
      const topHashtags = (await configApi.getTopHashtags()) as unknown as string[];
      setHashtagList(topHashtags);
    })();
  }, []);

  const handleHashtagClick = (hashtag: string) => {
    setFilter({ ...filter, hashtag, page: 1 });
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
            loading={loading}
            postList={postList}
            onSave={handleSavePost}
            onRemove={handleRemovePost}
            page={Number(filter.page) || 1}
            onPageChange={handlePageChange}
            filter={filter}
          />
        </Grid>

        <Grid item xs={12} md={10} lg={4} width="100%" mx="auto">
          <TopHashtags list={hashtagList} active={filter.hashtag} onClick={handleHashtagClick} />
        </Grid>
      </Grid>
    </Container>
  );
}
