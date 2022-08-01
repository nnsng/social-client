import { Box, Container } from '@mui/material';
import { userApi, postApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, NotFound, PageTitle } from 'components/common';
import { UserInfoSkeleton } from 'components/skeletons';
import { blogActions, selectPostList, selectPostLoading } from 'features/blog/blogSlice';
import PostList from 'features/blog/components/PostList';
import { IListParams, ILocationState, IPost, IUser, PostActionType } from 'models';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { APP_NAME } from 'utils/constants';
import { showErrorToast } from 'utils/toast';
import UserInfo from './components/UserInfo';

export interface IProfileProps {}

export default function ProfilePage(props: IProfileProps) {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const notFound = !!(location.state as ILocationState)?.notFound;

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const loading = useAppSelector(selectPostLoading);

  const [page, setPage] = useState<number>(1);

  const [userInfo, setUserInfo] = useState<Partial<IUser> | null>(null);

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {
        const user = await userApi.getUserInfo(username);
        setUserInfo(user);
        fetchUserPostList({ page: 1 });
      } catch (error) {
        showErrorToast(error);
        navigate(location.pathname, { replace: true, state: { notFound: true } });
      }
    })();
  }, [username]);

  useEffect(() => {
    fetchUserPostList({ page });
  }, [page]);

  const fetchUserPostList = ({ page }: { page: number }) => {
    dispatch(blogActions.fetchPostList({ page, username }));
  };

  const handlePageChange = ({ page }: IListParams) => {
    setPage(page ?? 1);
  };

  const handlePostAction = async (action: PostActionType, post: IPost) => {
    await postApi[action](post._id || '');
    if (action === 'remove') {
      fetchUserPostList({ page });
    }
  };

  const updateUser = (user: Partial<IUser>) => {
    setUserInfo(user);
  };

  if (notFound) return <NotFound showHeader />;

  return (
    <>
      <PageTitle title={userInfo?.name ?? APP_NAME} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          {loading || !userInfo ? (
            <UserInfoSkeleton />
          ) : (
            <UserInfo userInfo={userInfo} updateUser={updateUser} />
          )}

          {userInfo && (
            <PostList
              postList={postList}
              page={page}
              onFilterChange={handlePageChange}
              onPostAction={handlePostAction}
              isHomePage={false}
            />
          )}
        </Container>
      </Box>
    </>
  );
}
