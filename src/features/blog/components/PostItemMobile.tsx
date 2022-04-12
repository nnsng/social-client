import {
  BookmarkRemoveRounded,
  BorderColorRounded,
  DeleteRounded,
  LinkRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItem, MenuItem, Stack, Typography } from '@mui/material';
import { ActionMenu } from 'components/common';
import { IMenuItem, Post } from 'models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { copyPostLink, formatTime } from 'utils/common';
import { mixins } from 'utils/theme';
import { useTranslateFiles } from 'utils/translation';

export interface PostItemMobileProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onRemove?: (post: Post) => void;

  saved?: boolean;
  onUnSave?: (post: Post) => void;
}

export function PostItemMobile(props: PostItemMobileProps) {
  const { post, onEdit, onRemove, saved, onUnSave } = props;

  const { t } = useTranslation('postItemMobile');
  const { toast: toastTranslation } = useTranslateFiles('toast');

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleOpenMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleCopyLink = () => {
    closeMenu();
    copyPostLink(post);
  };

  const handleEditPost = () => {
    closeMenu();
    onEdit?.(post);
  };

  const handleRemovePost = async () => {
    try {
      await onRemove?.(post);
      closeMenu();
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const handleUnSavePost = async () => {
    try {
      await onUnSave?.(post);
      closeMenu();
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }
  };

  const subMenuItemList: IMenuItem[] = saved
    ? [
        {
          label: t('unsave'),
          icon: BookmarkRemoveRounded,
          onClick: handleUnSavePost,
        },
      ]
    : [
        {
          label: t('edit'),
          icon: BorderColorRounded,
          onClick: handleEditPost,
        },
        {
          label: t('delete'),
          icon: DeleteRounded,
          onClick: handleRemovePost,
        },
      ];

  const menuItemList: IMenuItem[] = [
    ...subMenuItemList,
    {
      label: t('copyLink'),
      icon: LinkRounded,
      onClick: handleCopyLink,
    },
  ];

  return (
    <ListItem disablePadding sx={{ my: 2 }}>
      <Stack width="100%" alignItems="center">
        <Box flexShrink={0} component={Link} to={`/blog/${post.slug}`}>
          <Avatar
            variant="rounded"
            src={post.thumbnail}
            sx={{
              width: 100,
              height: 80,
              mr: 2,
              bgcolor: 'grey.200',
            }}
          >
            <Box />
          </Avatar>
        </Box>

        <Stack
          direction="column"
          flexGrow={1}
          justifyContent="center"
          component={Link}
          to={`/blog/${post.slug}`}
        >
          <Typography
            variant="h6"
            color="text.primary"
            fontSize={16}
            fontWeight={600}
            lineHeight={1.4}
            sx={{ ...mixins.truncate(2) }}
          >
            {post.title}
          </Typography>

          {saved && (
            <Typography
              variant="body2"
              fontSize={12}
              color="text.secondary"
              display="flex"
              alignItems="center"
            >
              {t('author', { author: post.author?.name })}
            </Typography>
          )}

          <Typography
            variant="body2"
            fontSize={12}
            color="text.secondary"
            display="flex"
            alignItems="center"
          >
            {formatTime(post.createdAt)}
          </Typography>
        </Stack>

        <Box flexShrink={0} ml={2}>
          <IconButton size="small" onClick={toggleOpenMenu}>
            <MoreHorizRounded />
          </IconButton>

          <ActionMenu open={openMenu} onClose={closeMenu}>
            {menuItemList.map(({ label, icon: Icon, onClick }, idx) => (
              <MenuItem
                key={idx}
                sx={{
                  py: 1.5,
                  px: 2.5,
                  fontSize: 15,
                }}
                onClick={onClick}
              >
                <Icon sx={{ fontSize: 20, mr: 2 }} />
                {label}
              </MenuItem>
            ))}
          </ActionMenu>
        </Box>
      </Stack>
    </ListItem>
  );
}
