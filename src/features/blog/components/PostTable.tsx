import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ConfirmDialog, NoPost } from 'components/common';
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
  const { toast: toastTranslation, dialog: dialogTranslation } = useTranslateFiles(
    'toast',
    'dialog'
  );

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
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
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

                <TableCell
                  sx={{
                    '& a': {
                      color: 'text.primary',
                    },
                  }}
                >
                  <Link to={`/blog/post/${post.slug}`}>{post.title}</Link>
                </TableCell>

                {saved ? (
                  <TableCell align="center" sx={{ color: 'text.primary' }}>
                    <Link to={`/blog/user/${post.author?.username}`} style={{ color: 'inherit' }}>
                      {post.author?.name}
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell align="center">{post.statistics?.likeCount}</TableCell>
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
                        color="primary"
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

      <ConfirmDialog
        open={openDialog}
        onClose={closeDialog}
        title={saved ? dialogTranslation.post.unsave.title : dialogTranslation.post.delete.title}
        content={
          saved ? dialogTranslation.post.unsave.content : dialogTranslation.post.delete.content
        }
        onConfirm={saved ? handleUnSaveConfirm : handleRemoveConfirm}
        loading={loading}
      />
    </>
  );
}
