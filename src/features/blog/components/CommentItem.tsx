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
import { ActionMenu, ConfirmDialog, TimeTooltip, UserInfoPopup } from 'components/common';
import { GetUserInfoPopupEvent } from 'components/functions';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IComment, IMenuItem, IUser } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { getErrorMessage, showComingSoonToast } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';

export interface ICommentItemProps {
  comment: IComment;
  onRemove?: (comment: IComment) => void;
  onLike?: (comment: IComment) => void;
}

export default function CommentItem(props: ICommentItemProps) {
  const { comment, onRemove, onLike } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postComment');
  const { dialog: dialogTranslation } = useTranslateFiles('dialog');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const closeDialog = () => setOpenDialog(false);

  const handleUserClick = () => {
    navigate(`/user/${comment.user?.username}`);
  };

  const handleRemoveComment = async () => {
    setLoading(true);

    try {
      await onRemove?.(comment);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
  };

  const confirmRemoveComment = () => {
    closeMenu();
    setOpenDialog(true);
  };

  const handleLikeComment = () => {
    onLike?.(comment);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const { onMouseEnter, onMouseLeave } = GetUserInfoPopupEvent({ setOpenPopup });

  const isAuthorized = currentUser?._id === comment.userId || currentUser?.role === 'admin';
  const menuItemList: IMenuItem[] = [
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: confirmRemoveComment,
      show: isAuthorized,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: showComingSoonToast,
      show: true,
    },
  ];

  return (
    <>
      <ListItem disableGutters sx={{ mb: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <Avatar
              ref={userInfoRef}
              src={comment.user?.avatar}
              onClick={handleUserClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs>
            <Badge
              color="primary"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              invisible={!comment.likes?.length}
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
                    {comment.likes?.length || 0}
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
                  onClick={handleUserClick}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  sx={{ cursor: 'pointer' }}
                >
                  {comment.user?.name}
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
                {comment.likes?.includes(currentUser?._id || '') ? t('unlike') : t('like')}
              </Typography>

              <TimeTooltip timestamp={comment.createdAt}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    mr: 1,

                    '&::before': {
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
              </TimeTooltip>

              <IconButton size="small" disableRipple ref={anchorRef} onClick={toggleMenu}>
                <MoreHorizRounded />
              </IconButton>

              <ActionMenu
                open={openMenu}
                anchorEl={anchorRef.current}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                onClose={closeMenu}
              >
                {menuItemList.map(({ label, icon: Icon, onClick, show }, idx) =>
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

      <UserInfoPopup
        selectedUser={comment.user as Partial<IUser>}
        open={openPopup}
        anchorEl={userInfoRef.current}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />
    </>
  );
}
