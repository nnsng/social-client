import { Card, CardContent, Divider, Typography } from '@mui/material';
import { ConfirmDialog } from 'components/common';
import { IPost } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';
import MdEditor from './MdEditor';
import PostCardHeader from './PostCardHeader';

export interface IPostDetailProps {
  post: IPost;
  onSave?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
}

export default function PostDetail(props: IPostDetailProps) {
  const { post, onSave, onRemove } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postDetail');
  const { toast: toastTranslation, dialog: dialogTranslation } = useTranslateFiles(
    'toast',
    'dialog'
  );

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      toast.success(toastTranslation.postDetail.saveSuccess);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onRemove?.(post);
      toast.success(toastTranslation.postDetail.deleteSuccess);
      navigate('/blog');
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
    closeDialog();
  };

  return (
    <>
      <Card sx={{ mb: 1, bgcolor: 'background.default' }}>
        <Typography variant="h1" fontSize={40} fontWeight={600} mb={0}>
          {post.title}
        </Typography>

        <PostCardHeader
          post={post}
          onSavePost={handleSavePost}
          onRemovePost={() => setOpenDialog(true)}
          t={t}
          sx={{
            mt: 2,
            mb: 3,
            mx: 0,
            '& .icon-button': {
              ml: 1,
            },
          }}
        />

        <CardContent sx={{ '&:last-child': { p: 0 } }}>
          <MdEditor value={post.content} readOnly />

          <Divider
            sx={{
              display: { xs: 'block', lg: 'none' },
              borderColor: 'primary.main',
              borderWidth: 'thin',
            }}
          />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={openDialog}
        onClose={closeDialog}
        title={dialogTranslation.post.delete.title}
        content={dialogTranslation.post.delete.content}
        onConfirm={handleRemovePost}
        loading={loading}
      />
    </>
  );
}
