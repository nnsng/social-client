import { Box, Chip, Stack, SxProps, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatHashtag } from 'utils/common';
import { themeVariables } from 'utils/theme';

const recommendHashtags: string[] = ['Front-end', 'Back-end', 'Mobile', 'Design', 'DevOps']
  .map(formatHashtag)
  .filter((x) => !!x);

export interface IPostRecommendProps {
  hashtagActive: string | undefined;
  onHashtagClick?: (hashtag: string) => void;
}

export default function PostRecommend(props: IPostRecommendProps) {
  const { hashtagActive, onHashtagClick } = props;

  const { t } = useTranslation('postRecommend');

  const handleHashtagClick = (hashtag: string) => {
    if (hashtag === hashtagActive) return clearHashtag();
    onHashtagClick?.(hashtag);
  };

  const clearHashtag = () => {
    onHashtagClick?.('');
  };

  const isOnPC = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const hashtagWrapperSx: SxProps = isOnPC
    ? {
        mt: '1.5px',
        borderTop: 1,
        borderColor: 'divider',
      }
    : {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      };

  return (
    <Box
      sx={{
        position: 'sticky',
        top: themeVariables.headerHeight + 16, // 16 = 8 * 2 (paddingTop)
        mt: { xs: -1, lg: 0 },
        mb: -1,
      }}
    >
      {isOnPC && (
        <Typography
          variant="button"
          sx={{
            display: 'inline-block',
            mb: -1,
            borderBottom: 1,
            borderColor: 'text.primary',
            color: 'text.primary',
            fontWeight: 600,
            cursor: 'default',
          }}
        >
          {t('title')}
        </Typography>
      )}

      <Stack flexWrap="wrap" sx={hashtagWrapperSx}>
        {recommendHashtags.map((hashtag, idx) => (
          <Chip
            key={idx}
            color={hashtagActive === hashtag ? 'primary' : undefined}
            label={hashtag}
            onClick={() => handleHashtagClick?.(hashtag)}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: { lg: 16 },
              color: hashtagActive === hashtag ? 'common.white' : 'text.secondary',
            }}
          />
        ))}
        {hashtagActive && !recommendHashtags.includes(hashtagActive) && (
          <Chip
            color="primary"
            label={hashtagActive}
            onClick={clearHashtag}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: { lg: 16 },
              color: 'common.white',
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
