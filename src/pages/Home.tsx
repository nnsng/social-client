import { Grid } from '@mui/material';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postApi, userApi } from '~/api';
import { Suggestions } from '~/components/common';
import { PostFilter, PostList } from '~/components/post';
import { APP_NAME } from '~/constants';
import { usePageTitle } from '~/hooks';
import { ListParams, Post, User } from '~/models';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
  fetchPostList,
  selectPostList,
  selectPostLoading,
  selectTotalPages,
} from '~/store/slices/postSlice';

const MAX_SUGGEST_USERS = 3;

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const [filter, setFilter] = useState<ListParams>(() => {
    const params = queryString.parse(location.search);
    return { page: 1, by: 'all', ...params };
  });
  const [suggestedUsers, setSuggestedUsers] = useState<Partial<User>[]>([]);

  usePageTitle(APP_NAME, false);

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
      ...params,
      username: undefined,
    });
  }, [location.search]);

  useEffect(() => {
    const { page, by, ...rest } = filter;
    navigate(`?${queryString.stringify(rest)}`, { replace: true });
    dispatch(fetchPostList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    (async () => {
      try {
        const userList = await userApi.search('', false);

        const randomNumbers = new Set<number>();

        while (randomNumbers.size < MAX_SUGGEST_USERS) {
          randomNumbers.add(Math.trunc(Math.random() * userList.length));
        }

        const randomUsers = Array.from(randomNumbers).map((num) => userList[num]);
        setSuggestedUsers(randomUsers);
      } catch (error) {}
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
    await postApi.save(post._id!);
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id!);
    dispatch(fetchPostList(filter));
  };

  return (
    <Grid container spacing={{ xs: 0, lg: 8 }} flexDirection={{ xs: 'column-reverse', lg: 'row' }}>
      <Grid item xs md={11} lg>
        <PostFilter filter={filter} onChange={handleFilterChange} />

        <PostList
          postList={postList}
          page={{
            total: totalPage,
            current: Number(filter.page) || 1,
          }}
          loading={loading}
          onPageChange={(page) => handleFilterChange({ page })}
          onSave={handleSavePost}
          onDelete={handleDeletePost}
        />
      </Grid>

      <Grid item xs lg={4} display={{ xs: 'none', lg: 'block' }}>
        <Suggestions userList={suggestedUsers} />
      </Grid>
    </Grid>
  );
}
