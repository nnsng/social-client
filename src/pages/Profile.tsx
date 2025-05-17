import { postApi, userApi } from '@/api';
import { UserInfo } from '@/components/common';
import { PostList } from '@/components/post';
import { UserInfoSkeleton } from '@/components/skeletons';
import { APP_NAME } from '@/constants';
import { usePageTitle } from '@/hooks';
import { Post, User } from '@/models';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchPostList,
  selectPostList,
  selectPostLoading,
  selectTotalPages,
} from '@/store/slices/postSlice';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ProfilePage() {
  const { username } = useParams();

  const dispatch = useAppDispatch();
  const postList = useAppSelector(selectPostList);
  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const [page, setPage] = useState<number>(1);

  const [userInfo, setUserInfo] = useState<Partial<User> | null>(null);

  const pageTitle = userInfo?.name ?? APP_NAME;
  usePageTitle(pageTitle);

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {
        const user = await userApi.getUserInfo(username);
        setUserInfo(user);
        fetchUserPostList({ page: 1 });
      } catch (error) {}
    })();
  }, [username]);

  useEffect(() => {
    fetchUserPostList({ page });
  }, [page]);

  const fetchUserPostList = ({ page }: { page: number }) => {
    dispatch(fetchPostList({ page, username }));
  };

  const handleSavePost = async (post: Post) => {
    await postApi.save(post._id!);
  };

  const handleDeletePost = async (post: Post) => {
    await postApi.remove(post._id!);
    fetchUserPostList({ page });
  };

  const updateUser = (user: Partial<User>) => {
    setUserInfo((userInfo) => ({ ...userInfo, ...user }));
  };

  return (
    <Box>
      {loading || !userInfo ? (
        <UserInfoSkeleton />
      ) : (
        <UserInfo userInfo={userInfo} updateUser={updateUser} />
      )}

      {userInfo && (
        <PostList
          postList={postList}
          page={{
            total: totalPage,
            current: page,
          }}
          loading={loading}
          onPageChange={setPage}
          onSave={handleSavePost}
          onDelete={handleDeletePost}
        />
      )}
    </Box>
  );
}
