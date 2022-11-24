import { Container, Grid } from '@mui/material';
import { postApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PageTitle } from 'components/common';
import { APP_NAME } from 'constants/common';
import { ListParams, Post } from 'models';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import TopHashtags from '../components/TopHashtags';
import { postActions, selectPostList } from '../postSlice';

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);

  const [filter, setFilter] = useState<ListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, ...params };
  });
  const [hashtagList, setHashtagList] = useState<string[]>([]);

  useEffect(() => {
    const setPageOne = () => setFilter({ page: 1 });
    window.addEventListener('homeClick', setPageOne);
    return () => {
      window.removeEventListener('homeClick', setPageOne);
    };
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilter({
      ...filter,
      page: 1,
      search: undefined,
      hashtag: undefined,
      ...params,
      username: undefined,
    });
  }, [location.search]);

  useEffect(() => {
    const { by, ...rest } = filter;
    navigate(`?${queryString.stringify(rest)}`, { replace: true });
    dispatch(postActions.fetchPostList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    (async () => {
      try {
        const topHashtags = await postApi.getTopHashtags();
        setHashtagList(topHashtags);
      } catch (error) {
        setHashtagList([]);
      }
    })();
  }, []);

  const handleFilterChange = (newFilter: ListParams) => {
    setFilter({
      ...filter,
      page: 1,
      search: undefined,
      ...newFilter,
    });
  };

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id || '');
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id || '');
    dispatch(postActions.fetchPostList(filter));
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
            onSave={handleSavePost}
            onDelete={handleDeletePost}
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
