import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { NoPost } from 'components/common';
import { Post } from 'models';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils';

export interface PostTableProps {
  postList: Post[];
  onEdit?: (post: Post) => void;
  onRemove?: (post: Post) => void;

  saved?: boolean;
  onUnSave?: (post: Post) => void;
}

export default function PostTable(props: PostTableProps) {
  const { postList, onEdit, onRemove, saved, onUnSave } = props;

  const [selectedPost, setSelectedPost] = useState<Post>({} as Post);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeDialog = () => setOpenDialog(false);

  const handleEditPost = (post: Post) => {
    onEdit?.(post);
  };

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleRemoveConfirm = async () => {
    setLoading((prev) => true);

    try {
      await onRemove?.(selectedPost);
      toast.success('Xoá bài viết thành công.');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }

    setLoading((prev) => false);
    closeDialog();
  };

  const handleUnSaveConfirm = async () => {
    try {
      await onUnSave?.(selectedPost);
      toast.success('Bỏ lưu bài viết thành công.');
    } catch (error) {
      toast.error('Bỏ lưu bài viết thất bại.');
    }

    closeDialog();
  };

  return (
    <>
      <TableContainer
        sx={{
          '& th': {
            whiteSpace: 'nowrap',
            fontSize: 16,
            userSelect: 'none',
          },

          '& td': {
            fontSize: 16,
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>

              <TableCell>Tiêu đề</TableCell>

              {saved ? (
                <TableCell align="center">Tác giả</TableCell>
              ) : (
                <TableCell align="center">Thích</TableCell>
              )}

              <TableCell align="center">Đăng vào lúc</TableCell>

              <TableCell align="center">Tuỳ chọn</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {postList.map((post, idx) => (
              <TableRow key={post._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{idx + 1}</TableCell>

                <TableCell>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </TableCell>

                {saved ? (
                  <TableCell align="center">{post?.author?.name}</TableCell>
                ) : (
                  <TableCell align="center">{post?.likes?.length}</TableCell>
                )}

                <TableCell align="center">{formatTime(post.createdAt)}</TableCell>

                <TableCell align="center">
                  {saved ? (
                    <Button
                      color="error"
                      sx={{ whiteSpace: 'nowrap' }}
                      onClick={() => handleSelectPost(post)}
                    >
                      Bỏ lưu
                    </Button>
                  ) : (
                    <Box width="100%" whiteSpace={{ xs: 'normal', md: 'nowrap' }}>
                      <Button
                        color="info"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleEditPost(post)}
                      >
                        Chỉnh sửa
                      </Button>

                      <Button color="error" onClick={() => handleSelectPost(post)}>
                        Xoá
                      </Button>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {postList.length === 0 &&
          (saved ? (
            <NoPost>Bạn chưa lưu bài viết nào.</NoPost>
          ) : (
            <NoPost createText="Viết bài">Bạn chưa có bài viết nào.</NoPost>
          ))}
      </TableContainer>

      <Dialog open={openDialog} onClose={closeDialog} sx={{ userSelect: 'none' }}>
        <DialogTitle>{saved ? 'Bỏ lưu bài viết?' : 'Xoá bài viết?'}</DialogTitle>

        <Divider />

        <DialogContent>
          <DialogContentText sx={{ color: 'text.primary' }}>
            {saved
              ? 'Bạn có chắc muốn bỏ lưu bài viết? Hành động này không thể khôi phục.'
              : 'Bạn có chắc muốn xoá bài viết? Hành động này không thể khôi phục.'}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" size="large" disabled={loading} onClick={closeDialog}>
            Huỷ
          </Button>

          <Button
            variant="contained"
            color="error"
            size="large"
            disabled={loading}
            autoFocus
            startIcon={loading && <CircularProgress size={20} />}
            onClick={saved ? handleUnSaveConfirm : handleRemoveConfirm}
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
