import { Box, List, ListItem, Pagination, Stack, Theme } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { NoPost } from 'components/common';
import { selectTotalPages } from 'features/blog/blogSlice';
import { IPost } from 'models';
import React from 'react';
import PostCard from './PostCard';

export interface IPostListProps {
  postList: IPost[];
  page?: number;
  onPageChange?: (page: number) => void;

  onSave?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
}

export default function PostList(props: IPostListProps) {
  const { postList, page, onPageChange, onSave, onRemove } = props;

  const totalPage = useAppSelector(selectTotalPages);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange?.(page);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <List
        disablePadding
        sx={{
          borderTop: { xs: postList.length === 0 ? 1 : 0, lg: 0 },
          borderColor: (theme: Theme) => `${theme.palette.divider} !important`,
        }}
      >
        {postList.length > 0 ? (
          postList.map((post) => (
            <ListItem disablePadding key={post._id}>
              <PostCard post={post} onSave={onSave} onRemove={onRemove} />
            </ListItem>
          ))
        ) : (
          <NoPost createText="Viết bài">Chưa có bài viết.</NoPost>
        )}
      </List>

      {totalPage > 1 && (
        <Stack mb={2}>
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
