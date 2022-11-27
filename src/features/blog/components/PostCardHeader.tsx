import { MoreHorizRounded } from '@mui/icons-material';
import { Avatar, Box, CardHeader, IconButton, MenuItem, SxProps, Typography } from '@mui/material';
import { ActionMenu, TimeTooltip } from 'components/common';
import { useUserInfoPopup } from 'hooks';
import { MenuOption, Post } from 'models';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from 'utils/common';

export interface PostCardHeaderProps {
  post: Post;
  actionMenu: MenuOption[];
  sx?: SxProps;
  showPopup?: boolean;
}

export function PostCardHeader(props: PostCardHeaderProps) {
  const { post, actionMenu = [], sx, showPopup = true } = props;

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const anchorRef = useRef<any>(null);
  const userInfoRef = useRef<any>(null);

  const { userInfoPopupComponent, mouseEvents } = useUserInfoPopup({
    user: post.author || {},
    anchorEl: userInfoRef.current,
  });

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);

  const handleAuthorClick = () => {
    navigate(`/profile/${post.author?.username}`);
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
              {actionMenu.map(({ label, icon: Icon, onClick, show }, idx) =>
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
