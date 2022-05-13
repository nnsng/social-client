import { Box, Container } from '@mui/material';
import postApi from 'api/postApi';
import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Header, NotFound, PageTitle } from 'components/common';
import { blogActions, selectPostList, selectPostLoading } from 'features/blog/blogSlice';
import PostList from 'features/blog/components/PostList';
import { IPost, IUser } from 'models';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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

  if (loading) return <Header />;
  if (!userInfo) return <NotFound showHeader />;

  return (
    <>
      <PageTitle title={userInfo.name ?? ''} />
      <Header />

      <Box component="main">
        <Container maxWidth="md">
          <UserInfo userInfo={userInfo} updateUser={updateUser} />

          <PostList
            postList={postList}
            page={page}
            onPageChange={setPage}
            loading={loading}
            onSave={handleSavePost}
            onRemove={handleRemovePost}
            showTitle={false}
            showPopup={false}
          />
        </Container>
      </Box>
    </>
  );
}
