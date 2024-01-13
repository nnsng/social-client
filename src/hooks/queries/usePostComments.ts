import { useQuery } from '@tanstack/react-query';
import { commentApi } from '~/api';
import { TanStackQueryOptions } from '~/models';

export function usePostComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentApi.fetchPostComments(postId),
    initialData: [],
  });
}
