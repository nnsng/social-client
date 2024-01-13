import { useQuery } from '@tanstack/react-query';
import { postApi } from '~/api';

export function usePostDetail(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postApi.getBySlug(slug),
  });
}
