import { Box, List, ListItem, Pagination, Stack, Typography } from '@mui/material';
import { NoPost } from 'components/common';
import { selectTotalPages } from 'features/post/postSlice';
import { Post } from 'models';
import React from 'react';
import { useAppSelector } from 'app/hooks';
import PostCard from './PostCard';

export interface PostListProps {
  postList?: Post[];
  onSavePost?: (post: Post) => void;
  onRemovePost?: (post: Post) => void;
  page?: number;
  onPageChange?: (page: number) => void;
}

export default function PostList(props: PostListProps) {
  const { postList, onSavePost, onRemovePost, page, onPageChange } = props;

  const totalPage = useAppSelector(selectTotalPages);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange?.(page);
  };

  return (
    <Box>
      <Typography
        variant="button"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          mb: '-1px',
          borderBottom: 1,
          borderColor: 'text.primary',
          color: 'text.primary',
          fontWeight: 600,
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        PHÙ HỢP VỚI BẠN
      </Typography>

      <List disablePadding>
        {postList && postList.length > 0 ? (
          postList.map((post) => (
            <ListItem disablePadding sx={{ width: '100%' }} key={post._id}>
              <PostCard post={post} onSavePost={onSavePost} onRemovePost={onRemovePost} />
            </ListItem>
          ))
        ) : (
          <NoPost createText="Viết bài">Chưa có bài viết.</NoPost>
        )}
      </List>

      {totalPage > 1 && (
        <Stack my={2}>
          <Pagination
            shape="rounded"
            color="primary"
            count={totalPage}
            page={page}
            sx={{ m: 'auto' }}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Box>
  );
}
