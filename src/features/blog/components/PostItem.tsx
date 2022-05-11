import {
  BookmarkRemoveRounded,
  BorderColorRounded,
  DeleteRounded,
  LinkRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItem, MenuItem, Stack, Typography } from '@mui/material';
import { ActionMenu } from 'components/common';
import { IMenuItem, IPost } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { copyPostLink, formatTime } from 'utils/common';
import { themeMixins, themeVariables } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';

export interface IPostItemProps {
  post: IPost;
  saved?: boolean;
  onUnSave?: (post: IPost) => void;
  onEdit?: (post: IPost) => void;
  onRemove?: (post: IPost) => void;
}

export function PostItem(props: IPostItemProps) {
  const { post, onEdit, onRemove, saved, onUnSave } = props;

  const { t } = useTranslation('postItem');
  const { toast: toastTranslation } = useTranslateFiles('toast');

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);

  const toggleOpenMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleRemovePost = async () => {
    try {
      await onRemove?.(post);
      toast.success(toastTranslation.postItem.deleteSuccess);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleUnSavePost = async () => {
    try {
      await onUnSave?.(post);
      toast.success(toastTranslation.postItem.unsaveSuccess);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const menuItemList: IMenuItem[] = [
    {
      label: t('unsave'),
      icon: BookmarkRemoveRounded,
      onClick: handleUnSavePost,
      show: saved,
    },
    {
      label: t('edit'),
      icon: BorderColorRounded,
      onClick: () => onEdit?.(post),
      show: !saved,
    },
    {
      label: t('delete'),
      icon: DeleteRounded,
      onClick: handleRemovePost,
      show: !saved,
    },
    {
      label: t('copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      show: true,
    },
  ];

  return (
    <ListItem
      disablePadding
      sx={{
        my: 2,
        p: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack width="100%" alignItems="center">
        <Box flexShrink={0} component={Link} to={`/blog/post/${post.slug}`}>
          <Avatar
            variant="rounded"
            src={post.thumbnail}
            sx={{
              width: { xs: 100, sm: 200 },
              height: { xs: 80, sm: 100 },
              mr: 2,
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Box />
          </Avatar>
        </Box>

        <Stack direction="column" flexGrow={1} justifyContent="center">
          <Typography
            variant="h6"
            color="text.primary"
            fontWeight={600}
            sx={{ ...themeMixins.truncate(1) }}
            component={Link}
            to={`/blog/post/${post.slug}`}
          >
            {post.title}
          </Typography>

          <Typography
            variant="body1"
            component="div"
            color="text.secondary"
            sx={{
              ...themeMixins.truncate(1),
              mb: 0.5,
              '& *': { maxWidth: '100%' },
            }}
          >
            <ReactMarkdown
              children={post.content}
              remarkPlugins={[remarkGfm]}
              disallowedElements={['table']}
            />
          </Typography>

          <Stack alignItems="center" color="text.secondary">
            {saved && (
              <Typography
                variant="body2"
                fontSize={12}
                color="inherit"
                sx={{
                  '&::after': {
                    content: "'-'",
                    mx: 1,
                  },
                }}
              >
                {post.author?.name}
              </Typography>
            )}

            <Typography variant="body2" fontSize={12} color="inherit">
              {formatTime(post.createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Box flexShrink={0} ml={2}>
          <IconButton
            size="small"
            ref={anchorRef}
            onClick={toggleOpenMenu}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <MoreHorizRounded />
          </IconButton>

          <ActionMenu open={openMenu} anchorEl={anchorRef.current} onClose={closeMenu}>
            {menuItemList.map(
              ({ label, icon: Icon, onClick, show }, idx) =>
                show && (
                  <MenuItem
                    key={idx}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      fontSize: 15,
                    }}
                    onClick={() => handleMenuItemClick(onClick)}
                  >
                    <Icon sx={{ fontSize: 20, mr: 2 }} />
                    {label}
                  </MenuItem>
                )
            )}
          </ActionMenu>
        </Box>
      </Stack>
    </ListItem>
  );
}
