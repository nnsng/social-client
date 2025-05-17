import { NoPost } from '@/components/common';
import { PostCardSkeleton } from '@/components/skeletons';
import { Post } from '@/models';
import { Box, List, ListItem, Pagination, Stack } from '@mui/material';
import { PostCard } from './PostCard';

interface PostListProps {
  postList: Post[];
  page?: {
    current: number;
    total: number;
  };
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onSave?: (post: Post) => void;
  onUnsave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  mode?: 'default' | 'saved';
}

export function PostList(props: PostListProps) {
  const { postList, page, loading, onPageChange, onSave, onUnsave, onDelete, mode } = props;
  const postActions = { onSave, onUnsave, onDelete };

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
                <ListItem key={post._id} disablePadding sx={{ pb: 2 }}>
                  <PostCard post={post} mode={mode} {...postActions} />
                </ListItem>
              ))
            ) : (
              <NoPost />
            )}

            {page && page?.total > 1 && (
              <Stack mb={2}>
                <Pagination
                  shape="rounded"
                  color="primary"
                  count={page.total}
                  page={page.current}
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
