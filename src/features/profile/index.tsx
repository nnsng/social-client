import { Box, Container } from '@mui/material';
import { postApi, userApi } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, NotFound, PageTitle } from 'components/common';
import { UserInfoSkeleton } from 'components/skeletons';
import { APP_NAME } from 'constants/common';
import PostList from 'features/blog/components/PostList';
import { postActions, selectPostList, selectPostLoading } from 'features/blog/postSlice';
import { ListParams, LocationState, Post, User } from 'models';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { showErrorToast } from 'utils/toast';
import UserInfo from './components/UserInfo';

export default function ProfilePage() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const notFound = !!(location.state as LocationState)?.notFound;

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const loading = useAppSelector(selectPostLoading);

  const [page, setPage] = useState<number>(1);

  const [userInfo, setUserInfo] = useState<Partial<User> | null>(null);

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
    dispatch(postActions.fetchPostList({ page, username }));
  };

  const handlePageChange = ({ page }: ListParams) => {
    setPage(page ?? 1);
  };

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id || '');
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id || '');
    fetchUserPostList({ page });
  };

  const updateUser = (user: Partial<User>) => {
    setUserInfo(user);
  };

  const renderUserInfo = () => {
    if (loading || !userInfo) return <UserInfoSkeleton />;
    return <UserInfo userInfo={userInfo} updateUser={updateUser} />;
  };

  if (notFound) return <NotFound showHeader />;

  return (
    <>
      <PageTitle title={userInfo?.name ?? APP_NAME} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          {renderUserInfo()}

          {userInfo && (
            <PostList
              postList={postList}
              page={page}
              onFilterChange={handlePageChange}
              onSave={handleSavePost}
              onDelete={handleDeletePost}
              isHomePage={false}
            />
          )}
        </Container>
      </Box>
    </>
  );
}
