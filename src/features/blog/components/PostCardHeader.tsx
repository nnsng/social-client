import {
  BookmarkBorderRounded,
  BorderColorRounded,
  DeleteRounded,
  FlagRounded,
  LinkRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
import { Avatar, Box, CardHeader, IconButton, MenuItem, SxProps, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, TimeTooltip } from 'components/common';
import { selectCurrentUser } from 'features/auth/userSlice';
import { useUserInfoPopup } from 'hooks';
import { MenuItemProps, Post } from 'models';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { copyPostLink, formatTime } from 'utils/common';
import { Role } from 'constants/common';
import { showComingSoonToast } from 'utils/toast';

export interface PostCardHeaderProps {
  post: Post;
  onSave?: () => void;
  onRemove?: () => void;
  sx?: SxProps;
  showPopup?: boolean;
}

export default function PostCardHeader(props: PostCardHeaderProps) {
  const { post, onSave, onRemove, sx, showPopup = true } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('postCardHeader');

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const { userInfoPopupComponent, mouseEvents } = useUserInfoPopup({
    user: post.author || {},
    anchorEl: userInfoRef.current,
  });

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleAuthorClick = () => {
    navigate(`/user/${post.author?.username}`);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const isAuthor = post.authorId === currentUser?._id;
  const isAdmin = currentUser?.role === Role.ADMIN;
  const postMenu: MenuItemProps[] = [
    {
      label: t('menu.edit'),
      icon: BorderColorRounded,
      onClick: () => navigate?.(`/blog/edit/${post._id}`, { state: { hideHeaderMenu: true } }),
      show: isAuthor,
    },
    {
      label: t('menu.delete'),
      icon: DeleteRounded,
      onClick: onRemove,
      show: isAuthor || isAdmin,
    },
    {
      label: t('menu.copyLink'),
      icon: LinkRounded,
      onClick: () => copyPostLink(post),
      show: true,
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
      <CardHeader
        avatar={
          <Avatar
            ref={userInfoRef}
            src={post.author?.avatar}
            onClick={handleAuthorClick}
            {...mouseEvents}
            sx={{ cursor: 'pointer' }}
          />
        }
        action={
          <Box>
            <IconButton
              disableTouchRipple
              size="small"
              onClick={onSave}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                },
              }}
            >
              <BookmarkBorderRounded />
            </IconButton>

            <IconButton
              disableTouchRipple
              size="small"
              ref={anchorRef}
              onClick={toggleMenu}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'transparent',
                },
              }}
            >
              <MoreHorizRounded />
            </IconButton>

            <ActionMenu open={openMenu} anchorEl={anchorRef.current} onClose={closeMenu}>
              {postMenu.map(({ label, icon: Icon, onClick, show }, idx) =>
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
          </Box>
        }
        title={
          <Typography
            variant="subtitle2"
            color="text.primary"
            fontSize={14}
            fontWeight={600}
            onClick={handleAuthorClick}
            {...mouseEvents}
            sx={{
              display: 'inline-block',
              cursor: 'pointer',
            }}
          >
            {post.author?.name}
          </Typography>
        }
        subheader={
          <TimeTooltip timestamp={post.createdAt}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontSize={12}
              sx={{ display: 'inline-block' }}
            >
              {formatTime(post.createdAt)}
            </Typography>
          </TimeTooltip>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0,
          '& .MuiCardHeader-subheader': {
            mt: -0.5,
          },
          '& .MuiCardHeader-action': {
            m: 0,
          },
          ...sx,
        }}
      />

      {showPopup && userInfoPopupComponent}
    </>
  );
}
