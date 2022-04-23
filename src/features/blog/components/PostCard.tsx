import {
  BookmarkBorderRounded,
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  MoreHorizRounded,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, ConfirmDialog } from 'components/common';
import { GetPostMenu } from 'components/common/Menu';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Post } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime, hasItemInArray } from 'utils/common';
import { mixins, themeVariables } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';

export interface PostCardProps {
  post: Post;
  onSave?: (post: Post) => void;
  onRemove?: (post: Post) => void;
}

export default function PostCard(props: PostCardProps) {
  const { post, onSave, onRemove } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postCard');
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
      toast.success(toastTranslation.postCard.saveSuccess);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleRemovePost = async () => {
    setLoading((prev) => true);

    try {
      await onRemove?.(post);
      toast.success(toastTranslation.postCard.deleteSuccess);
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

  const isAuthorized = currentUser?._id === post.authorId || currentUser?.role === 'admin';
  const postMenu = GetPostMenu({
    post,
    isAuthorized,
    onRemovePost: () => setOpenDialog(true),
    navigate,
    t,
  });

  const statistics = [
    {
      icon: <FavoriteBorderRounded />,
      text: t('statistics.likeCount'),
      count: post.statistics?.likeCount || 0,
    },
    {
      icon: <ChatBubbleOutlineRounded />,
      text: t('statistics.commentCount'),
      count: post.statistics?.commentCount || 0,
    },
    {
      icon: <VisibilityOutlined />,
      text: t('statistics.viewCount'),
      count: post.statistics?.viewCount || 0,
    },
  ];

  return (
    <>
      <Card
        sx={{
          width: '100%',
          p: 2,
          mb: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/blog/user/${post?.author?.username}`}>
              <Avatar src={post?.author?.avatar} />
            </Link>
          }
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
                open={openMenu}
                anchorEl={anchorRef.current}
                paperSx={{ boxShadow: themeVariables.boxShadow, overflow: 'hidden' }}
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
            <Typography
              variant="subtitle2"
              color="text.primary"
              fontWeight={600}
              component={Link}
              to={`/blog/user/${post?.author?.username}`}
            >
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
            p: 0,
            mb: post.thumbnail ? 0 : 2,
            '& .MuiCardHeader-action': {
              m: 0,
            },
          }}
        />

        <CardContent sx={{ '&:last-child': { p: 0 } }}>
          <Stack
            justifyContent="space-between"
            flexDirection={{ sm: 'row', xs: 'column' }}
            alignItems={{ sm: 'center', xs: 'flex-start' }}
          >
            <Box flexGrow={1}>
              <Typography
                variant="h6"
                color="text.primary"
                component={Link}
                to={`/blog/post/${post.slug}`}
                sx={{
                  ...mixins.truncate(2),
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                {post.title}
              </Typography>

              <Typography variant="body1" m={0} sx={{ ...mixins.truncate(2) }}>
                {post.content}
              </Typography>

              <Stack
                component={Link}
                to={`/blog/post/${post.slug}`}
                sx={{
                  mt: 1,
                  color: 'text.secondary',
                  '& button:hover': {
                    color: 'text.primary',
                    bgcolor: 'transparent',
                  },
                }}
              >
                {statistics.map(({ icon, text, count }, idx) => (
                  <Tooltip key={idx} title={text}>
                    <Button color="inherit" size="small" startIcon={icon}>
                      {count}
                    </Button>
                  </Tooltip>
                ))}
              </Stack>
            </Box>

            {post.thumbnail && (
              <Box
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  mt: { xs: 2, sm: 0 },
                  ml: { xs: 0, sm: 2 },
                }}
              >
                <CardMedia
                  component={Link}
                  to={`/blog/post/${post.slug}`}
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
          </Stack>
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
