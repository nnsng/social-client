import {
  BookmarkBorderRounded,
  BorderColorRounded,
  DeleteRounded,
  FlagRounded,
  LinkRounded,
  MoreHorizRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { ActionMenu } from 'components/common';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IMenuItem, Post } from 'models';
import React, { useRef, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { themeConstants } from 'utils/theme';
import { copyPostLink, formatTime } from 'utils/common';
import MdEditor from './MdEditor';

export interface PostDetailProps {
  post: Post;
  onSave?: (post: Post) => void;
  onRemove?: (post: Post) => void;
}

export default function PostDetail({ post, onSave, onRemove }: PostDetailProps) {
  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleSavePost = async () => {
    try {
      await onSave?.(post);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRemovePost = async () => {
    try {
      await onRemove?.(post);
      closeMenu();
      toast.success('Xóa bài viết thành công');
      navigate('/blog');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const isAuthorized = currentUser?._id === post?.authorId || currentUser?.role === 'admin';
  const menuItems: IMenuItem[] = [
    {
      label: 'Chỉnh sửa bài viết',
      icon: BorderColorRounded,
      onClick: () => navigate(`/blog/edit/${post._id}`),
      authorized: isAuthorized,
    },
    {
      label: 'Xoá bài viết',
      icon: DeleteRounded,
      onClick: handleRemovePost,
      authorized: isAuthorized,
    },
    {
      label: 'Sao chép liên kết',
      icon: LinkRounded,
      onClick: () => {
        copyPostLink(post);
        closeMenu();
      },
      authorized: true,
    },
    {
      label: 'Báo cáo bài viết',
      icon: FlagRounded,
      onClick: () => {},
      authorized: true,
    },
  ];

  return (
    <Card elevation={0}>
      <Typography variant="h1" fontSize={40} fontWeight={600} mb={2}>
        {post.title}
      </Typography>

      <CardHeader
        avatar={<Avatar src={post.author?.avatar} />}
        action={
          <Box>
            <IconButton
              disableTouchRipple
              size="small"
              sx={{
                ml: 1,

                ':hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                },
              }}
              onClick={handleSavePost}
            >
              <BookmarkBorderRounded />
            </IconButton>

            <IconButton
              disableTouchRipple
              size="small"
              sx={{
                ml: 1,

                ':hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                },
              }}
              ref={anchorRef as any}
              onClick={toggleMenu}
            >
              <MoreHorizRounded />
            </IconButton>

            <ActionMenu
              open={open}
              anchorEl={anchorRef.current}
              paperSx={{ boxShadow: themeConstants.boxShadow, overflow: 'hidden' }}
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
                    <Icon sx={{ fontSize: { xs: 20, sm: 18 }, mr: 2 }} />
                    {label}
                  </MenuItem>
                ) : null
              )}
            </ActionMenu>
          </Box>
        }
        title={
          <Typography variant="subtitle2" fontWeight="600">
            {post?.author?.name || '(Khách)'}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" fontWeight="400">
            {formatTime(post.createdAt)}
          </Typography>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 4,
          mx: 0,
          p: 0,

          '& .MuiCardHeader-action': {
            m: 0,
          },
        }}
      />

      <CardContent sx={{ p: 0 }}>
        <MdEditor value={post.content || 'Nội dung...'} readOnly />
      </CardContent>
    </Card>
  );
}
