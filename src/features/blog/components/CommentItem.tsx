import { EditRounded, FavoriteRounded, MoreHorizRounded } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, ConfirmDialog, TimeTooltip, UserInfoPopup } from 'components/common';
import { GetCommentItemMenu, GetUserInfoPopupEvent } from 'components/functions';
import { selectCurrentUser } from 'features/auth/authSlice';
import { CommentActionType, IComment, IMenuItem, IUser } from 'models';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatTime } from 'utils/common';
import { getErrorMessage } from 'utils/toast';
import { useTranslateFiles } from 'utils/translation';

export interface ICommentItemProps {
  comment: IComment;
  onCommentAction?: (action: CommentActionType, comment: IComment) => void;
}

export default function CommentItem(props: ICommentItemProps) {
  const { comment, onCommentAction } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postComment');
  const { dialog: dialogTranslation } = useTranslateFiles('dialog');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const closeDialog = () => setOpenDialog(false);

  const handleUserClick = () => {
    navigate(`/user/${comment.user?.username}`);
  };

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setContent(comment.content);
  };

  const handleEdit = async () => {
    setLoading(true);

    try {
      const editedComment: IComment = {
        ...comment,
        content: content.trim(),
      };

      await onCommentAction?.('edit', editedComment);
      setIsEdit(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }

    setLoading(false);
  };

  const handleRemoveComment = async () => {
    setLoading(true);

    try {
      await onCommentAction?.('remove', comment);
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
    onCommentAction?.('like', comment);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const mouseEvents = GetUserInfoPopupEvent({ setOpenPopup });

  const menuItemList: IMenuItem[] = GetCommentItemMenu({
    comment,
    currentUser,
    onEdit: () => setIsEdit(true),
    onRemove: confirmRemoveComment,
    t,
  });

  return (
    <>
      <ListItem disableGutters>
        <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
          <Grid item xs="auto">
            <Avatar
              ref={userInfoRef}
              src={comment.user?.avatar}
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              onClick={handleUserClick}
              {...mouseEvents}
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
                width: isEdit ? '100%' : 'unset',
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
                  width: isEdit ? '100%' : 'fit-content',
                  py: 1,
                  px: 2,
                  bgcolor: 'action.selected',
                  borderRadius: 4,
                }}
              >
                <Stack alignItems="center">
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight={600}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleUserClick}
                    {...mouseEvents}
                  >
                    {comment.user?.name}
                  </Typography>

                  {comment.edited && (
                    <Tooltip title={t('edited')} placement="top" arrow>
                      <EditRounded
                        sx={{
                          ml: 1,
                          p: '2px',
                          borderRadius: '50%',
                          bgcolor: 'text.secondary',
                          color: 'background.default',
                          fontSize: 12,
                          opacity: 0.6,
                        }}
                      />
                    </Tooltip>
                  )}
                </Stack>

                {isEdit ? (
                  <Stack direction="column">
                    <TextField
                      variant="standard"
                      fullWidth
                      autoFocus
                      value={content}
                      onChange={handleChange}
                    />

                    <Box mt={1} ml="auto">
                      <Button size="small" disabled={loading} onClick={cancelEdit}>
                        {t('edit.cancel')}
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        disabled={
                          loading ||
                          content.trim().length === 0 ||
                          content.trim() === comment.content
                        }
                        startIcon={loading && <CircularProgress size={16} />}
                        onClick={handleEdit}
                      >
                        {t('edit.confirm')}
                      </Button>
                    </Box>
                  </Stack>
                ) : (
                  <Typography variant="body1" color="text.primary">
                    {content}
                  </Typography>
                )}
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
