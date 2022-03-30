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
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { useTranslateFiles } from 'utils/translation';

export interface PostTableProps {
  postList: Post[];
  onEdit?: (post: Post) => void;
  onRemove?: (post: Post) => void;

  saved?: boolean;
  onUnSave?: (post: Post) => void;
}

export default function PostTable(props: PostTableProps) {
  const { postList, onEdit, onRemove, saved, onUnSave } = props;

  const { t } = useTranslation('postTable');
  const { toast: toastTranslation } = useTranslateFiles('toast');

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
      toast.success(toastTranslation.postTable.deleteSuccess);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }

    setLoading((prev) => false);
    closeDialog();
  };

  const handleUnSaveConfirm = async () => {
    try {
      await onUnSave?.(selectedPost);
      toast.success(toastTranslation.postTable.unsaveSuccess);
    } catch (error) {
      toast.error(toastTranslation.postTable.unsaveError);
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

              <TableCell>{t('tableCell.title')}</TableCell>

              {saved ? (
                <TableCell align="center">{t('tableCell.author')}</TableCell>
              ) : (
                <TableCell align="center">{t('tableCell.like')}</TableCell>
              )}

              <TableCell align="center">{t('tableCell.createdAt')}</TableCell>

              <TableCell align="center">{t('tableCell.options')}</TableCell>
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
                      {t('button.unsave')}
                    </Button>
                  ) : (
                    <Box width="100%" whiteSpace={{ xs: 'normal', md: 'nowrap' }}>
                      <Button
                        color="info"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={() => handleEditPost(post)}
                      >
                        {t('button.edit')}
                      </Button>

                      <Button color="error" onClick={() => handleSelectPost(post)}>
                        {t('button.delete')}
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
            <NoPost>{t('noPost')}</NoPost>
          ) : (
            <NoPost createText={t('createPost')}>{t('noPost')}</NoPost>
          ))}
      </TableContainer>

      <Dialog open={openDialog} onClose={closeDialog} sx={{ userSelect: 'none' }}>
        <DialogTitle>{saved ? t('dialog.unsave.title') : t('dialog.delete.title')}</DialogTitle>

        <Divider />

        <DialogContent>
          <DialogContentText sx={{ color: 'text.primary' }}>
            {saved ? t('dialog.unsave.content') : t('dialog.delete.content')}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" size="large" disabled={loading} onClick={closeDialog}>
            {t('dialog.button.cancel')}
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
            {t('dialog.button.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
