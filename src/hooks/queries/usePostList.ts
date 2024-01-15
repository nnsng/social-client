import { useQuery } from '@tanstack/react-query';
import { postApi } from '~/api';
import { ListParams, ListResponse, Post } from '~/models';
import { calculateTotalPage } from '~/utils/common';

interface Params extends ListParams {
  saved?: boolean;
}

export function usePostList({ saved = false, ...params }: Params) {
  return useQuery<ListResponse<Post>>({
    queryKey: ['postList', params],
    queryFn: () => (saved ? postApi.fetchSavedList(params) : postApi.fetchPostList(params)),
    initialData: {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        totalRows: 0,
      },
    },
    select: (data) => ({
      ...data,
      pagination: {
        ...data.pagination,
        totalPage: calculateTotalPage(data.pagination),
      },
    }),
  });
}
