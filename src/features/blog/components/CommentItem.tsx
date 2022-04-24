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
import { ActionMenu, ConfirmDialog } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Comment, IMenuItem } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { useTranslateFiles } from 'utils/translation';

export interface CommentItemProps {
  comment: Comment;
  onRemove?: (comment: Comment) => void;
  onLike?: (comment: Comment) => void;
}

export default function CommentItem(props: CommentItemProps) {
  const { comment, onRemove, onLike } = props;

  const { t } = useTranslation('postComment');
  const { toast: toastTranslation, dialog: dialogTranslation } = useTranslateFiles(
    'toast',
    'dialog'
  );

  const currentUser = useAppSelector(selectCurrentUser);

  const anchorRef = useRef<HTMLElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const closeDialog = () => setOpenDialog(false);

  const handleRemoveComment = async () => {
    setLoading((prevState) => true);

    try {
      await onRemove?.(comment);
    } catch (error: any) {
      const errorName = error?.response?.data?.name || 'somethingWrong';
      toast.error(toastTranslation.errors[errorName]);
    }

    setLoading((prevState) => false);
  };

  const confirmRemoveComment = () => {
    closeMenu();
    setOpenDialog(true);
  };

  const handleLikeComment = () => {
    onLike?.(comment);
  };

  const isAuthorized = currentUser?._id === comment.userId || currentUser?.role === 'admin';
  const menuItems: IMenuItem[] = [
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: confirmRemoveComment,
      show: isAuthorized,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: () => {},
      show: true,
    },
  ];

  return (
    <>
      <ListItem disableGutters sx={{ mb: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Link to={`/blog/user/${comment?.user?.username}`}>
              <Avatar src={comment?.user?.avatar} sx={{ width: 36, height: 36 }} />
            </Link>
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
                  bgcolor: 'background.paper',
                  borderRadius: 5,
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                },
              }}
              badgeContent={
                <Stack alignItems="center" p={0.3}>
                  <FavoriteRounded sx={{ color: 'primary.main', fontSize: 18 }} />
                  <Typography variant="subtitle2" color="text.primary" ml={0.5}>
                    {comment?.likes?.length || 0}
                  </Typography>
                </Stack>
              }
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 'fit-content',
                  py: 1,
                  px: 2,
                  bgcolor: 'action.hover',
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight={600}
                  component={Link}
                  to={`/blog/user/${comment?.user?.username}`}
                >
                  {comment?.user?.name}
                </Typography>

                <Typography variant="body1" color="text.primary">
                  {comment.content}
                </Typography>
              </Box>
            </Badge>

            <Stack alignItems="center" mt={1}>
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
                open={openMenu}
                anchorEl={anchorRef.current}
                zIndex={(theme) => (theme.zIndex as any).drawer + 1}
                onClose={closeMenu}
              >
                {menuItems.map(({ label, icon: Icon, onClick, show }, idx) =>
                  show ? (
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

      <ConfirmDialog
        open={openDialog}
        onClose={closeDialog}
        title={dialogTranslation.comment.delete.title}
        content={dialogTranslation.comment.delete.content}
        onConfirm={handleRemoveComment}
        loading={loading}
      />
    </>
  );
}
