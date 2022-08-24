import {
  BorderColorRounded,
  DeleteRounded,
  DriveFileRenameOutlineRounded,
  FavoriteRounded,
  FlagRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
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
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, ConfirmDialog, TimeTooltip } from 'components/common';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useSubmitWithEnter, useUserInfoPopup } from 'hooks';
import { Comment, CommentActionType, MenuItemProps } from 'models';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/common';
import { showComingSoonToast, showErrorToast } from 'utils/toast';
import { translateFiles } from 'utils/translation';

export interface CommentItemProps {
  comment: Comment;
  onCommentAction?: (action: CommentActionType, comment: Comment) => void;
}

export default function CommentItem(props: CommentItemProps) {
  const { comment, onCommentAction } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postComment');
  const { dialog: dialogTranslation } = translateFiles('dialog');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);
  const [editComment, setEditComment] = useState<boolean>(false);

  const editRef = useRef<any>(null);
  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const { userInfoPopupComponent, mouseEvents } = useUserInfoPopup({
    user: comment.user || {},
    anchorEl: userInfoRef.current,
  });

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  useEffect(() => {
    if (!editComment) return;

    const length = content.length;
    editRef.current?.focus();
    editRef.current?.setSelectionRange(length, length);
  }, [editComment]);

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
    setEditComment(false);
    setContent(comment.content);
  };

  const handleEdit = async () => {
    setLoading(true);

    try {
      const editedComment: Comment = {
        ...comment,
        content: content.trim(),
      };

      await onCommentAction?.('edit', editedComment);
      setEditComment(false);
    } catch (error) {
      showErrorToast(error);
    }

    setLoading(false);
  };

  const handleRemoveComment = async () => {
    setLoading(true);

    try {
      await onCommentAction?.('remove', comment);
    } catch (error) {
      showErrorToast(error);
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

  const onKeyUp = useSubmitWithEnter(handleEdit);

  const isAuthor = comment.userId === currentUser?._id;
  const isAdmin = currentUser?.role === 'admin';
  const commentMenu: MenuItemProps[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: () => setEditComment(true),
      show: isAuthor,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: confirmRemoveComment,
      show: isAuthor || isAdmin,
    },
    {
      label: t('menu.report'),
      icon: FlagRounded,
      onClick: showComingSoonToast,
      show: !isAuthor,
    },
  ];

  return (
    <>
      <ListItem disableGutters>
        <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
          <Grid item xs="auto">
            <Avatar
              ref={userInfoRef}
              src={comment.user?.avatar}
              onClick={handleUserClick}
              {...mouseEvents}
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
              invisible={comment.likes?.length === 0 || editComment}
              badgeContent={
                <Stack alignItems="center" p={0.3}>
                  <FavoriteRounded sx={{ color: 'primary.main', fontSize: 18 }} />

                  <Typography color="text.primary" fontSize={14} fontWeight={500} ml={0.5}>
                    {comment.likes?.length || 0}
                  </Typography>
                </Stack>
              }
              sx={{
                width: editComment ? '100%' : 'unset',
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
            >
              <Box
                sx={{
                  position: 'relative',
                  width: editComment ? '100%' : 'fit-content',
                  py: 1,
                  px: 2,
                  bgcolor: 'action.selected',
                  borderRadius: 4,
                }}
              >
                <Stack alignItems="center">
                  <Typography
                    color="text.primary"
                    fontSize={14}
                    fontWeight={600}
                    onClick={handleUserClick}
                    {...mouseEvents}
                    sx={{ cursor: 'pointer' }}
                  >
                    {comment.user?.name}
                  </Typography>

                  {comment.edited && (
                    <Tooltip title={t('edited')} placement="top" arrow>
                      <DriveFileRenameOutlineRounded
                        sx={{
                          ml: 0.5,
                          color: 'text.secondary',
                          fontSize: 14,
                          opacity: 0.8,
                        }}
                      />
                    </Tooltip>
                  )}
                </Stack>

                {editComment ? (
                  <Stack direction="column">
                    <TextField
                      variant="standard"
                      fullWidth
                      value={content}
                      inputRef={editRef}
                      onChange={handleChange}
                      onKeyUp={onKeyUp}
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
                  <Typography color="text.primary" fontSize={16} sx={{ wordBreak: 'break-word' }}>
                    {content}
                  </Typography>
                )}
              </Box>
            </Badge>

            <Stack alignItems="center" mt={1}>
              <Typography
                color="primary"
                fontSize={14}
                fontWeight={500}
                onClick={handleLikeComment}
                sx={{ cursor: 'pointer' }}
              >
                {comment.likes?.includes(currentUser?._id || '') ? t('unlike') : t('like')}
              </Typography>

              <TimeTooltip timestamp={comment.createdAt}>
                <Typography
                  color="text.secondary"
                  fontSize={14}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
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
                onClose={closeMenu}
                sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
              >
                {commentMenu.map(({ label, icon: Icon, onClick, show }, idx) =>
                  show ? (
                    <MenuItem
                      key={idx}
                      onClick={() => handleMenuItemClick(onClick)}
                      sx={{
                        py: 1.5,
                        px: 2.5,
                        fontSize: 15,
                      }}
                    >
                      <Icon sx={{ mr: 2, fontSize: 18 }} />
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

      {userInfoPopupComponent}
    </>
  );
}
