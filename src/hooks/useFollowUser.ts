import { userApi } from '@/api';
import { FollowAction, User } from '@/models';
import { useAppDispatch } from '@/store/hooks';
import { userActions } from '@/store/slices/userSlice';
import { useState } from 'react';

export function useFollowUser(updateUser?: (user: Partial<User>) => void) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const onFollow = async (userId: string, action: FollowAction) => {
    setLoading(true);

    try {
      const updated = await userApi[action](userId);
      dispatch(userActions.updateCurrentUser(updated.currentUser));
      updateUser?.(updated.selectedUser);
    } catch (error) {}

    setLoading(false);
  };

  return {
    loading,
    follow: (userId: string) => onFollow(userId, 'follow'),
    unfollow: (userId: string) => onFollow(userId, 'unfollow'),
  };
}
