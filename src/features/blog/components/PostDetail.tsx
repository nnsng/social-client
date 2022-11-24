import { Card, CardContent, Typography } from '@mui/material';
import { ConfirmDialog } from 'components/common';
import { Post } from 'models';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { themeMixins } from 'utils/theme';
import { showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import MdEditor from './MdEditor';
import PostCardHeader from './PostCardHeader';

export interface PostDetailProps {
  post: Post;
  onSave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export default function PostDetail(props: PostDetailProps) {
  const { post, onSave, onDelete } = props;

  const navigate = useNavigate();

  const { toast: toastTranslation, dialog: dialogTranslation } = translateFiles('toast', 'dialog');

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      toast.success(toastTranslation.postDetail.saveSuccess);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onDelete?.(post);
      toast.success(toastTranslation.postDetail.deleteSuccess);
      navigate('/blog');
    } catch (error) {
      showErrorToast(error);
    }

    setLoading(false);
    closeDialog();
  };

  return (
    <>
      <Card
        sx={{
          ...themeMixins.paperBorder(),
          mb: 2,
          p: 2,
        }}
      >
        <Typography fontSize={{ xs: 24, sm: 40 }} fontWeight={600} lineHeight={1.2} mb={0}>
          {post.title}
        </Typography>

        <PostCardHeader
          post={post}
          onSave={handleSavePost}
          onRemove={() => setOpenDialog(true)}
          sx={{
            my: 2,
            mx: 0,
            '& .icon-button': {
              ml: 1,
            },
          }}
        />

        <CardContent sx={{ '&:last-child': { p: 0 } }}>
          <MdEditor value={post.content} readOnly />
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
