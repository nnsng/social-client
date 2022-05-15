import { BookmarkBorderRounded, MoreHorizRounded } from '@mui/icons-material';
import { Avatar, Box, CardHeader, IconButton, MenuItem, SxProps, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, TimeTooltip, UserInfoPopup } from 'components/common';
import { GetPostMenu, GetUserInfoPopupEvent } from 'components/functions';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IPost, IUser } from 'models';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/common';

export interface IPostCardHeaderProps {
  post: IPost;
  onSavePost?: () => void;
  onRemovePost?: () => void;
  t?: any; // TFunction
  sx?: SxProps;
  showPopup?: boolean;
}

export default function PostCardHeader(props: IPostCardHeaderProps) {
  const { post, onSavePost, onRemovePost, t, sx, showPopup = true } = props;

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleAuthorClick = () => {
    navigate(`/user/${post.author?.username}`);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    closeMenu();
    callback?.();
  };

  const { onMouseEnter, onMouseLeave } = GetUserInfoPopupEvent({ setOpenPopup });

  const isAuthorized = currentUser?._id === post.authorId || currentUser?.role === 'admin';
  const postMenu = GetPostMenu({
    post,
    isAuthorized,
    onRemovePost,
    navigate,
    t,
  });

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            ref={userInfoRef}
            src={post.author?.avatar}
            onClick={handleAuthorClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            sx={{ cursor: 'pointer' }}
          />
        }
        action={
          <Box>
            <IconButton
              disableTouchRipple
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                },
              }}
              className="icon-button"
              onClick={onSavePost}
            >
              <BookmarkBorderRounded />
            </IconButton>

            <IconButton
              disableTouchRipple
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'transparent',
                },
              }}
              className="icon-button"
              ref={anchorRef}
              onClick={toggleMenu}
            >
              <MoreHorizRounded />
            </IconButton>

            <ActionMenu open={openMenu} anchorEl={anchorRef.current} onClose={closeMenu}>
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
            onClick={handleAuthorClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
              sx={{
                fontSize: '0.8rem',
                fontWeight: 400,
                display: 'inline-block',
              }}
            >
              {formatTime(post.createdAt)}
            </Typography>
          </TimeTooltip>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 0,
          '& .MuiCardHeader-action': {
            m: 0,
          },
          ...sx,
        }}
      />

      <UserInfoPopup
        selectedUser={post.author as Partial<IUser>}
        open={showPopup && openPopup}
        anchorEl={userInfoRef.current}
      />
    </>
  );
}
