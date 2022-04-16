import { BookmarkBorderRounded, MoreHorizRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, ConfirmDialog } from 'components/common';
import { GetPostMenu } from 'components/common/Menu';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Post } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { themeConstants } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';
import MdEditor from './MdEditor';

export interface PostDetailProps {
  post: Post;
  onSave?: (post: Post) => void;
  onRemove?: (post: Post) => void;
}

export default function PostDetail({ post, onSave, onRemove }: PostDetailProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('postDetail');
  const { toast: toastTranslation, dialog: dialogTranslation } = useTranslateFiles(
    'toast',
    'dialog'
  );

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const closeDialog = () => setOpenDialog(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleRemovePost = async () => {
    setLoading((prev) => true);

    try {
      await onRemove?.(post);
      toast.success(toastTranslation.postDetail.deleteSuccess);
      navigate('/blog');
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }

    setLoading((prev) => false);
    closeDialog();
  };

  const handleMenuItemClick = (onMenuItemClick?: () => void) => {
    closeMenu();
    onMenuItemClick?.();
  };

  const isAuthorized = currentUser?._id === post?.authorId || currentUser?.role === 'admin';
  const postMenu = GetPostMenu({
    post,
    isAuthorized,
    onRemovePost: () => setOpenDialog(true),
    navigate,
    t,
  });

  return (
    <>
      <Card sx={{ bgcolor: 'background.default' }}>
        <Typography variant="h1" fontSize={40} fontWeight={600} mb={2}>
          {post.title}
        </Typography>

        <CardHeader
          avatar={<Avatar src={post.author?.avatar} />}
          action={
            <Box>
              <IconButton
                disableTouchRipple
                size="small"
                sx={{
                  ml: 1,
                  color: 'text.secondary',
                  ':hover': {
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
                onClick={handleSavePost}
              >
                <BookmarkBorderRounded />
              </IconButton>

              <IconButton
                disableTouchRipple
                size="small"
                sx={{
                  ml: 1,
                  color: 'text.secondary',
                  ':hover': {
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
                ref={anchorRef as any}
                onClick={toggleMenu}
              >
                <MoreHorizRounded />
              </IconButton>

              <ActionMenu
                open={openMenu}
                anchorEl={anchorRef.current}
                paperSx={{ boxShadow: themeConstants.boxShadow, overflow: 'hidden' }}
                onClose={closeMenu}
              >
                {postMenu.map(({ label, icon: Icon, onClick, show }, idx) =>
                  show ? (
                    <MenuItem
                      key={idx}
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        fontSize: 15,
                      }}
                      onClick={() => handleMenuItemClick(onClick)}
                    >
                      <Icon sx={{ fontSize: { xs: 20, sm: 18 }, mr: 2 }} />
                      {label}
                    </MenuItem>
                  ) : null
                )}
              </ActionMenu>
            </Box>
          }
          title={
            <Typography variant="subtitle2" fontWeight={600}>
              {post?.author?.name}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" fontWeight="400">
              {formatTime(post.createdAt)}
            </Typography>
          }
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 4,
            mx: 0,
            p: 0,

            '& .MuiCardHeader-action': {
              m: 0,
            },
          }}
        />

        <CardContent sx={{ p: 0 }}>
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
