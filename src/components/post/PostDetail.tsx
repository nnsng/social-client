import {
  BookmarkRounded,
  BorderColorRounded,
  DeleteRounded,
  FlagRounded,
  LinkRounded,
} from '@mui/icons-material';
import { Box, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, StyledCard } from '~/components/common';
import { ROLE } from '~/constants';
import { MenuOption, Post } from '~/models';
import { useUserStore } from '~/store';
import { copyPostLink } from '~/utils/common';
import { showComingSoonToast, showToast } from '~/utils/toast';
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

  const currentUser = useUserStore((state) => state.currentUser);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      showToast('post.save');
    } catch (error) {}
  };

  const handleRemovePost = async () => {
    setLoading(true);

    try {
      await onDelete?.(post);
      showToast('post.delete');
      navigate('/');
    } catch (error) {}

    setLoading(false);
    closeDialog();
  };

  const isAuthor = post.authorId === currentUser._id;
  const isAdmin = currentUser.role === ROLE.ADMIN;

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
      onClick: () => navigate?.(`/edit/${post._id}`),
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
    <Box pb={2}>
      <StyledCard>
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
      </StyledCard>

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
