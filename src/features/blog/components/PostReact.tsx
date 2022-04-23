import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Post } from 'models';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasItemInArray } from 'utils/common';

export interface PostReactProps {
  post: Post;
  onOpenComment?: () => void;
  onLikePost?: () => void;
}

export default function PostReact(props: PostReactProps) {
  const { post, onOpenComment, onLikePost } = props;

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const filterByKeyword = (keyword: string) => {
    navigate(`/blog?keyword=${keyword}`);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          display: 'inline-block',
          pb: 0.5,
          mb: -1,
          borderBottom: 1,
          borderColor: 'text.primary',
          color: 'text.primary',
          fontSize: 18,
          fontWeight: 600,
        }}
        component={Link}
        to={`/blog/user/${post?.author?.username}`}
      >
        {post?.author?.name}
      </Typography>

      <Typography variant="body2" fontSize={16} lineHeight={1.8} py={1}>
        {post?.author?.bio}
      </Typography>

      <Stack alignItems="center">
        <Button
          color="inherit"
          sx={{
            color: 'text.secondary',
            fontSize: 16,
            ':hover': {
              color: 'error.main',
            },
          }}
          startIcon={
            hasItemInArray(post?.likes || [], currentUser?._id) ? (
              <FavoriteRounded sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteBorderRounded />
            )
          }
          onClick={onLikePost}
        >
          {post.statistics?.likeCount}
        </Button>

        <Button
          color="inherit"
          sx={{
            color: 'text.secondary',
            fontSize: 16,
            ':hover': {
              color: 'primary.main',
            },
          }}
          startIcon={<ChatBubbleOutlineRounded />}
          onClick={onOpenComment}
        >
          {post.statistics?.commentCount}
        </Button>
      </Stack>

      <Stack flexWrap="wrap" mt={2}>
        {post.keywords &&
          post.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              label={keyword}
              onClick={() => filterByKeyword(keyword)}
              sx={{
                mb: 1,
                mr: 1,
              }}
            />
          ))}
      </Stack>
    </Box>
  );
}
