import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/userSlice';
import { Post } from 'models';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface PostReactionProps {
  post: Post;
  onOpenComment?: () => void;
  onLikePost?: () => void;
}

export default function PostReaction(props: PostReactionProps) {
  const { post, onOpenComment, onLikePost } = props;

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const filterByHashtag = (hashtag: string) => {
    navigate(`/blog?hashtag=${hashtag}`);
  };

  return (
    <Box>
      <Typography
        color="text.primary"
        fontSize={18}
        fontWeight={600}
        sx={{
          display: 'inline-block',
          pb: 0.5,
          mb: -1,
          borderBottom: 1,
          borderColor: 'text.primary',
        }}
        component={Link}
        to={`/user/${post.author?.username}`}
      >
        {post.author?.name}
      </Typography>

      <Typography fontSize={16} lineHeight={1.8} pt={1}>
        {post.author?.bio}
      </Typography>

      <Stack
        sx={{
          alignItems: 'center',
          '& button': {
            fontSize: 16,
            color: 'text.secondary',
          },
        }}
      >
        <Button
          color="inherit"
          startIcon={
            (post.likes || []).includes(currentUser?._id as string) ? (
              <FavoriteRounded sx={{ color: 'error.main' }} />
            ) : (
              <FavoriteBorderRounded />
            )
          }
          onClick={onLikePost}
          sx={{ '&:hover': { color: 'error.main' } }}
        >
          {post.likeCount}
        </Button>

        <Button
          color="inherit"
          startIcon={<ChatBubbleOutlineRounded />}
          onClick={onOpenComment}
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          {post.commentCount}
        </Button>
      </Stack>

      <Stack flexWrap="wrap" my={1}>
        {post.hashtags &&
          post.hashtags.map((hashtag, idx) => (
            <Chip
              key={idx}
              label={hashtag}
              onClick={() => filterByHashtag(hashtag)}
              sx={{
                mb: 1,
                mr: 1,
                color: 'text.secondary',
              }}
            />
          ))}
      </Stack>
    </Box>
  );
}
