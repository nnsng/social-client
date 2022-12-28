import { MoreHorizRounded } from '@mui/icons-material';
import { Avatar, Box, CardHeader, IconButton, SxProps, Tooltip, Typography } from '@mui/material';
import { ActionMenu } from '~/components/common';
import { useUserInfoPopup } from '~/hooks';
import { MenuOption, Post } from '~/models';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '~/utils/common';

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

            <ActionMenu
              menu={actionMenu}
              open={openMenu}
              anchorEl={anchorRef.current}
              onClose={closeMenu}
            />
          </Box>
        }
        title={
          <Typography
            variant="subtitle2"
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
          <Tooltip title={formatTime(post.createdAt, 'DD/MM/YYYY, HH:mm')}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'inline-block' }}>
              {formatTime(post.createdAt)}
            </Typography>
          </Tooltip>
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
