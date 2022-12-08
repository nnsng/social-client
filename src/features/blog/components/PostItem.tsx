import { BookmarkRemoveRounded, LinkRounded, MoreHorizRounded } from '@mui/icons-material';
import { Box, CardMedia, IconButton, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { ActionMenu, ConfirmDialog } from '~/components/common';
import { MenuOption, Post } from '~/models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { copyPostLink, formatTime } from '~/utils/common';
import { themeMixins } from '~/utils/theme';
import { showErrorToastFromServer } from '~/utils/toast';
import { translateFiles } from '~/utils/translation';

export interface PostItemProps {
  post: Post;
  onUnsave?: (post: Post) => void;
}

export function PostItem(props: PostItemProps) {
  const { post, onUnsave } = props;

  const { t } = useTranslation('postItem');
  const { toast: toastTranslation } = translateFiles('toast');

  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const anchorRef = useRef<any>(null);

  const closeMenu = () => setOpenMenu(false);

  const handleUnsavePost = async () => {
    setLoading(true);
    try {
      await onUnsave?.(post);
      toast.success(toastTranslation.postItem.unsaveSuccess);
    } catch (error) {
      showErrorToastFromServer(error);
    }
    setLoading(false);
  };

  const optionMenu: MenuOption[] = [
    {
      label: t('unsave'),
      icon: BookmarkRemoveRounded,
      onClick: () => setOpenDialog(true),
    },
    {
      label: t('copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
    },
  ];

  return (
    <ListItem
      disablePadding
      sx={{
        ...themeMixins.paperBorder(),
        my: 2,
        p: 1,
      }}
    >
      <Stack width="100%" alignItems="center">
        <Box flexShrink={0} component={Link} to={`/blog/post/${post.slug}`}>
          <CardMedia
            image={post.thumbnail}
            sx={{
              height: { xs: 80, sm: 100 },
              aspectRatio: { xs: '1', sm: '2' },
              mr: 2,
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Box />
          </CardMedia>
        </Box>

        <Stack direction="column" flexGrow={1} justifyContent="center">
          <Typography
            color="text.primary"
            variant="h6"
            fontWeight={600}
            sx={{ ...themeMixins.truncate(1) }}
            component={Link}
            to={`/blog/post/${post.slug}`}
          >
            {post.title}
          </Typography>

          <Typography color="text.secondary" variant="caption">
            {post.author?.name}
          </Typography>

          <Tooltip title={formatTime(post.createdAt, 'DD/MM/YYYY, HH:mm')}>
            <Typography color="text.secondary" variant="caption" width="fit-content">
              {formatTime(post.createdAt)}
            </Typography>
          </Tooltip>
        </Stack>

        <Box flexShrink={0} ml={2}>
          <IconButton
            size="small"
            ref={anchorRef}
            onClick={() => setOpenMenu((x) => !x)}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <MoreHorizRounded />
          </IconButton>

          <ActionMenu
            menu={optionMenu}
            open={openMenu}
            anchorEl={anchorRef.current}
            onClose={closeMenu}
          />
        </Box>
      </Stack>

      <ConfirmDialog
        type="post.unsave"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleUnsavePost}
        loading={loading}
      />
    </ListItem>
  );
}
