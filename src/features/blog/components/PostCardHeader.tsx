import { BookmarkBorderRounded, MoreHorizRounded } from '@mui/icons-material';
import { Avatar, Box, CardHeader, IconButton, MenuItem, SxProps, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ActionMenu, TimeTooltip, UserInfoPopup } from 'components/common';
import { usePostMenu, useUserInfoPopupMouseEvents } from 'hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IPost, IUser } from 'models';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/common';

export interface IPostCardHeaderProps {
  post: IPost;
  onSave?: () => void;
  onRemove?: () => void;
  t?: any; // TFunction
  sx?: SxProps;
  showPopup?: boolean;
}

export default function PostCardHeader(props: IPostCardHeaderProps) {
  const { post, onSave, onRemove, t, sx, showPopup = true } = props;

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const mouseEvents = useUserInfoPopupMouseEvents({ setOpenPopup });

  const postMenu = usePostMenu({
    post,
    currentUser,
    onRemove,
    navigate,
    t,
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

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            ref={userInfoRef}
            src={post.author?.avatar}
            sx={{ cursor: 'pointer' }}
            onClick={handleAuthorClick}
            {...mouseEvents}
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
              onClick={onSave}
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
            sx={{
              display: 'inline-block',
              cursor: 'pointer',
            }}
            onClick={handleAuthorClick}
            {...mouseEvents}
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
              sx={{
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
          '& .MuiCardHeader-subheader': {
            mt: -0.5,
          },
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
