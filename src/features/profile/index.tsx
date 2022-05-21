import { Box, Container } from '@mui/material';
import postApi from 'api/postApi';
import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, NotFound, PageTitle } from 'components/common';
import { UserInfoSkeleton } from 'components/skeletons';
import { blogActions, selectPostList, selectPostLoading } from 'features/blog/blogSlice';
import PostList from 'features/blog/components/PostList';
import { IListParams, IPost, IUser } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APP_NAME } from 'utils/constants';
import { getErrorMessage } from 'utils/toast';
import UserInfo from './components/UserInfo';

export interface IProfileProps {}

export default function ProfilePage(props: IProfileProps) {
  const { username } = useParams();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const loading = useAppSelector(selectPostLoading);

  const [page, setPage] = useState<number>(1);

  const [userInfo, setUserInfo] = useState<Partial<IUser> | null>(null);

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {
        const user = (await userApi.getUserInfo(username)) as unknown as Partial<IUser>;
        setUserInfo(user);
        fetchUserPostList({ page: 1 });
      } catch (error) {
        toast.error(getErrorMessage(error));
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

  const handleSavePost = async (post: IPost) => {
    await postApi.save(post._id as string);
  };

  const handleRemovePost = async (post: IPost) => {
    await postApi.remove(post._id as string);
    fetchUserPostList({ page });
  };

  const updateUser = (user: Partial<IUser>) => {
    setUserInfo(user);
  };

  return (
    <>
      <PageTitle title={userInfo?.name ?? APP_NAME} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          {loading ? (
            <UserInfoSkeleton />
          ) : userInfo ? (
            <UserInfo userInfo={userInfo} updateUser={updateUser} />
          ) : (
            <NotFound />
          )}

          {userInfo && (
            <PostList
              postList={postList}
              page={page}
              onFilterChange={handlePageChange}
              onSave={handleSavePost}
              onRemove={handleRemovePost}
              isHomePage={false}
            />
          )}
        </Container>
      </Box>
    </>
  );
}
