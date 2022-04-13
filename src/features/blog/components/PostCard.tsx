import { BookmarkBorderRounded, MoreHorizRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu } from 'components/common';
import { GetPostMenu } from 'components/common/Menu';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Post } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { mixins, themeConstants } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';

export interface PostCardProps {
  post: Post;
  onSave?: (post: Post) => void;
  onRemove?: (post: Post) => void;
}

export default function PostCard({ post, onSave, onRemove }: PostCardProps) {
  const navigate = useNavigate();

  const { t } = useTranslation('postCard');
  const { toast: toastTranslation } = useTranslateFiles('toast');

  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
      toast.success(toastTranslation.postCard.saveSuccess);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleRemovePost = async () => {
    try {
      closeMenu();
      await onRemove?.(post);
      toast.success(toastTranslation.postCard.deleteSuccess);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleMenuItemClick = (onMenuItemClick?: () => void) => {
    closeMenu();
    onMenuItemClick?.();
  };

  const isAuthorized = currentUser?._id === post?.authorId || currentUser?.role === 'admin';
  const postMenu = GetPostMenu({
    post,
    isAuthorized,
    onRemovePost: handleRemovePost,
    navigate,
    t,
  });

  return (
    <Card
      sx={{
        width: '100%',
        p: 0,
        pt: 3,
        borderTop: 1,
        borderColor: 'divider',
        borderRadius: 0,
        bgcolor: 'background.default',
      }}
    >
      <CardHeader
        avatar={<Avatar src={post?.author?.avatar} />}
        action={
          <Box>
            <IconButton
              disableTouchRipple
              size="small"
              sx={{
                mx: 0.5,
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
                mx: 0.5,
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
              open={open}
              anchorEl={anchorRef.current}
              paperSx={{ boxShadow: themeConstants.boxShadow, overflow: 'hidden' }}
              onClose={closeMenu}
            >
              {postMenu.map(({ label, icon: Icon, onClick, active }, idx) =>
                active ? (
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
          mb: 2,
          p: 0,

          '& .MuiCardHeader-action': {
            m: 0,
          },
        }}
      />

      <CardContent sx={{ p: 0 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ sm: 'row', xs: 'column' }}
          alignItems={{ sm: 'center', xs: 'flex-start' }}
        >
          <Box flexGrow={1}>
            <Typography
              variant="h6"
              color="text.primary"
              component={Link}
              to={`/blog/${post.slug}`}
              sx={{
                ...mixins.truncate(2),
                mb: 1,
                fontWeight: 600,
              }}
            >
              {post.title}
            </Typography>

            <Typography variant="body1" m={0} sx={{ ...mixins.truncate(2) }}>
              {post.description}
            </Typography>
          </Box>

          {post.thumbnail && (
            <Box width={{ xs: '100%', sm: 'auto' }} mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 2 }}>
              <CardMedia
                component={Link}
                to={`/blog/${post.slug}`}
                image={post.thumbnail}
                title={post.title}
                sx={{
                  maxWidth: { xs: 400, sm: 200 },
                  width: { xs: '100%', sm: 200 },
                  height: { xs: 200, sm: 100 },
                  borderRadius: 2,
                  bgcolor: 'grey.200',
                }}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
