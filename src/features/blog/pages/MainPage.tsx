import { Container, Grid } from '@mui/material';
import configApi from 'api/configApi';
import postApi from 'api/postApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { IListParams, IPost, PostActionType } from 'models';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { blogActions, selectPostList } from '../blogSlice';
import PostList from '../components/PostList';
import TopHashtags from '../components/TopHashtags';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);

  const [filter, setFilter] = useState<IListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, ...params };
  });
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  const resetSearchFilter: IListParams = {
    search: undefined,
    hashtag: undefined,
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilter({
      ...filter,
      page: 1,
      ...resetSearchFilter,
      ...params,
      username: undefined,
    });
  }, [location.search]);

  useEffect(() => {
    const { by, ...rest } = filter;
    navigate(`?${queryString.stringify(rest)}`, { replace: true });
    dispatch(blogActions.fetchPostList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    (async () => {
      try {
        const topHashtags = (await configApi.getTopHashtags()) as unknown as string[];
        setHashtagList(topHashtags);
      } catch (error) {
        setHashtagList([]);
      }
    })();
  }, []);

  const handleFilterChange = (newFilter: IListParams) => {
    setFilter({ ...filter, page: 1, ...resetSearchFilter, ...newFilter });
  };

  const handlePostAction = async (action: PostActionType, post: IPost) => {
    await postApi[action](post._id || '');
    if (action === 'remove') {
      dispatch(blogActions.fetchPostList(filter));
    }
  };

  return (
    <Container>
      <PageTitle title={APP_NAME} />

      <Grid
        container
        spacing={{ xs: hashtagList.length ? 2 : 0, lg: 8 }}
        flexDirection={{ xs: 'column-reverse', lg: 'row' }}
      >
        <Grid item xs={12} md={10} lg width="100%" mx="auto">
          <PostList
            postList={postList}
            page={Number(filter.page) || 1}
            filter={filter}
            onFilterChange={handleFilterChange}
            onPostAction={handlePostAction}
          />
        </Grid>

        <Grid item xs={12} md={10} lg={4} width="100%" mx="auto">
          <TopHashtags
            list={hashtagList}
            active={filter.hashtag}
            onHashtagClick={(hashtag) => handleFilterChange({ hashtag, search: undefined })}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
