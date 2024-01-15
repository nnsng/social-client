import { useQuery } from '@tanstack/react-query';
import { userApi } from '~/api';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: userApi.getCurrentUser,
  });
}
