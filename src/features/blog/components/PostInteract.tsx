import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from '@mui/icons-material';
import { Box, Button, Chip, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Keyword, Post } from 'models';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface PostInteractProps {
  post: Post;
  openComment?: () => void;
  onLikePost?: () => void;
}

export default function PostInteract(props: PostInteractProps) {
  const { post, openComment, onLikePost } = props;

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const filterByKeyword = (keyword: Keyword) => {
    navigate(`/blog?keyword=${keyword.value}`);
  };

  return (
    <Box position={{ xs: 'relative', lg: 'sticky' }} top={{ xs: 0, lg: 120 }} mb={5}>
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
          cursor: 'default',
        }}
      >
        {post?.author?.name}
      </Typography>

      <Typography variant="body2" fontSize={16} lineHeight={1.8} py={1}>
        {post?.author?.description}
      </Typography>

      <Box display="flex" alignItems="center">
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
            post.likes?.includes(currentUser?._id as string) ? (
              <FavoriteRounded sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteBorderRounded />
            )
          }
          onClick={onLikePost}
        >
          {post?.likes?.length}
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
          onClick={openComment}
        >
          {post?.commentCount}
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" mt={2}>
        {post.keywords &&
          post.keywords.map((keyword, idx) => (
            <Chip
              key={idx}
              variant="outlined"
              label={keyword.name}
              onClick={() => filterByKeyword(keyword)}
              sx={{
                mb: 1,
                mr: 1,
                fontSize: 16,
              }}
            />
          ))}
      </Box>
    </Box>
  );
}
