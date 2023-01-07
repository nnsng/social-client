import { Box, List, ListItem, Pagination, Stack } from '@mui/material';
import { useAppSelector } from '~/app/hooks';
import { NoPost } from '~/components/common';
import { PostCardSkeleton } from '~/components/skeletons';
import { Post } from '~/models';
import { selectPostLoading, selectTotalPages } from '~/redux/slices/postSlice';
import { PostCard } from './PostCard';

export interface PostListProps {
  postList: Post[];
  page?: number;
  onPageChange?: (page: number) => void;
  onSave?: (post: Post) => void;
  onUnsave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  mode?: 'default' | 'saved';
}

export function PostList(props: PostListProps) {
  const { postList, page, onPageChange, onSave, onUnsave, onDelete, mode } = props;
  const postActions = { onSave, onUnsave, onDelete };

  const totalPage = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectPostLoading);

  const handlePageChange = (e: any, page: number) => {
    onPageChange?.(page);
  };

  return (
    <Box width="100%">
      <List disablePadding>
        {loading ? (
          <ListItem disablePadding>
            <PostCardSkeleton />
          </ListItem>
        ) : (
          <>
            {postList.length > 0 ? (
              postList.map((post) => (
                <ListItem key={post._id} disablePadding>
                  <PostCard post={post} mode={mode} {...postActions} />
                </ListItem>
              ))
            ) : (
              <NoPost />
            )}

            {totalPage > 1 && (
              <Stack mb={2}>
                <Pagination
                  shape="rounded"
                  color="primary"
                  count={totalPage}
                  page={page}
                  onChange={handlePageChange}
                  sx={{ m: 'auto' }}
                />
              </Stack>
            )}
          </>
        )}
      </List>
    </Box>
  );
}
