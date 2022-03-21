import { DeleteRounded, FavoriteRounded, FlagRounded, MoreHorizRounded } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  ListItem,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Comment, IMenuItem } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import theme from 'utils/theme';

export interface CommentItemProps {
  comment: Comment;
  onRemove?: (comment: Comment) => void;
  onLike?: (comment: Comment) => void;
}

export default function CommentItem({ comment, onRemove, onLike }: CommentItemProps) {
  const { t } = useTranslation('postComment');

  const currentUser = useAppSelector(selectCurrentUser);

  const anchorRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleRemoveComment = async () => {
    closeMenu();

    try {
      await onRemove?.(comment);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleLikeComment = () => {
    onLike?.(comment);
  };

  const isAuthorized = currentUser?._id === comment.userId || currentUser?.role === 'admin';
  const menuItems: IMenuItem[] = [
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: handleRemoveComment,
      authorized: isAuthorized,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: () => {},
      authorized: true,
    },
  ];

  return (
    <ListItem disableGutters sx={{ mb: 2.5 }}>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Avatar src={comment?.user?.avatar} sx={{ width: 36, height: 36 }} />
        </Grid>

        <Grid item xs>
          <Badge
            color="primary"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            invisible={!comment?.likes?.length}
            sx={{
              '& .MuiBadge-badge': {
                bottom: 2,
                right: 6,
                py: 1.5,
                pl: 0.3,
                pr: 0.5,
                bgcolor: 'common.white',
                borderRadius: 5,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                color: 'text.primary',
                fontSize: 12,
              },
            }}
            badgeContent={
              <Typography variant="subtitle2" display="flex" alignItems="center" fontSize="inherit">
                <Stack
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 0.5,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                  }}
                >
                  <FavoriteRounded sx={{ color: 'white', fontSize: 13, m: 0.3 }} />
                </Stack>
                {comment?.likes?.length || 0}
              </Typography>
            }
          >
            <Box
              sx={{
                position: 'relative',
                width: 'fit-content',
                backgroundColor: 'grey.100',
                borderRadius: 4,
                py: 1,
                px: 2,
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                {comment?.user?.name}
              </Typography>

              <Typography variant="body1">{comment.content}</Typography>
            </Box>
          </Badge>

          <Stack direction="row" alignItems="center" mt={1}>
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={handleLikeComment}
            >
              {comment?.likes?.includes(currentUser?._id as string) ? t('unlike') : t('like')}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                mr: 1,

                '::before': {
                  width: 2,
                  height: 2,
                  content: '""',
                  bgcolor: 'grey.500',
                  borderRadius: '50%',
                  display: 'block',
                  mx: 1,
                },
              }}
            >
              {formatTime(comment.createdAt)}
            </Typography>

            <IconButton size="small" disableRipple ref={anchorRef as any} onClick={toggleMenu}>
              <MoreHorizRounded />
            </IconButton>

            <ActionMenu
              open={open}
              anchorEl={anchorRef.current}
              zIndex={theme.zIndex.drawer + 1}
              onClose={closeMenu}
            >
              {menuItems.map(({ label, icon: Icon, onClick, authorized }, idx) =>
                authorized ? (
                  <MenuItem
                    key={idx}
                    sx={{
                      py: 1.5,
                      px: 2.5,
                      fontSize: 15,
                    }}
                    onClick={onClick}
                  >
                    <Icon sx={{ mr: 2 }} />
                    {label}
                  </MenuItem>
                ) : null
              )}
            </ActionMenu>
          </Stack>
        </Grid>
      </Grid>
    </ListItem>
  );
}
