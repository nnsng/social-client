import {
  BookmarkRounded,
  BorderColorRounded,
  DeleteRounded,
  FlagRounded,
  LinkRounded,
} from '@mui/icons-material';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ConfirmDialog } from 'components/common';
import { Role } from 'constants/common';
import { selectCurrentUser } from 'features/auth/userSlice';
import { MenuOption, Post } from 'models';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { copyPostLink } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { showComingSoonToast, showErrorToastFromServer } from 'utils/toast';
import { translateFiles } from 'utils/translation';
import { MdEditor, PostCardHeader } from '.';

export interface PostDetailProps {
  post: Post | null;
  onSave?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export function PostDetail(props: PostDetailProps) {
  const { post, onSave, onDelete } = props;
  if (!post) return null;

  const navigate = useNavigate();

  const { t } = useTranslation('postMenu');
  const { toast: toastTranslation } = translateFiles('toast');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      toast.success(toastTranslation.postDetail.saveSuccess);
    } catch (error) {
      showErrorToastFromServer(error);
    }
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onDelete?.(post);
      toast.success(toastTranslation.postDetail.deleteSuccess);
      navigate('/blog');
    } catch (error) {
      showErrorToastFromServer(error);
    }

    setLoading(false);
    closeDialog();
  };

  const isAuthor = post.authorId === currentUser?._id;
  const isAdmin = currentUser?.role === Role.ADMIN;

  const actionMenu: MenuOption[] = [
    {
      label: t('save'),
      icon: BookmarkRounded,
      onClick: handleSavePost,
      show: true,
    },
    {
      label: t('edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/blog/edit/${post._id}`),
      show: isAuthor,
    },
    {
      label: t('delete'),
      icon: DeleteRounded,
      onClick: () => setOpenDialog(true),
      show: isAuthor || isAdmin,
    },
    {
      label: t('copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      show: true,
    },
    {
      label: t('report'),
      icon: FlagRounded,
      onClick: showComingSoonToast,
      show: !isAuthor,
    },
  ];

  return (
    <Box>
      <Card
        sx={{
          ...themeMixins.paperBorder(),
          mb: 2,
          p: 2,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight={600} mb={0}>
          {post.title}
        </Typography>

        <PostCardHeader
          post={post}
          actionMenu={actionMenu}
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
        type="post.delete"
        open={openDialog}
        onClose={closeDialog}
        onConfirm={handleRemovePost}
        loading={loading}
      />
    </Box>
  );
}
