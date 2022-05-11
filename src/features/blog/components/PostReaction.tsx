import {
  ChatBubbleOutlineRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from '@mui/icons-material';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { IPost } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export interface IPostReactionProps {
  post: IPost;
  onOpenComment?: () => void;
  onLikePost?: () => void;
}

export default function PostReaction(props: IPostReactionProps) {
  const { post, onOpenComment, onLikePost } = props;

  const { t } = useTranslation('postReaction');

  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const filterByHashtag = (hashtag: string) => {
    navigate(`/blog?hashtag=${hashtag}`);
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
        to={`/blog/user/${post.author?.username}`}
      >
        {post.author?.name}
      </Typography>

      <Typography variant="body2" fontSize={16} lineHeight={1.8} pt={1}>
        {post.author?.bio}
      </Typography>

      <Stack
        sx={{
          alignItem: 'center',
          '& button': {
            fontSize: 16,
            color: 'text.secondary',
          },
        }}
      >
        <Button
          color="inherit"
          sx={{
            '&:hover': {
              color: 'error.main',
            },
          }}
          startIcon={
            (post.likes || []).includes(currentUser?._id as string) ? (
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
            '&:hover': {
              color: 'primary.main',
            },
          }}
          startIcon={<ChatBubbleOutlineRounded />}
          onClick={onOpenComment}
        >
          {post.statistics?.commentCount}
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
              }}
            />
          ))}
      </Stack>

      <Typography variant="subtitle2" color="text.secondary">
        {t('view')}: {post.statistics?.viewCount}
      </Typography>
    </Box>
  );
}
