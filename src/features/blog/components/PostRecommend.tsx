import { Box, Chip, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatKeyword } from 'utils/common';

const recommendKeywords: string[] = [
  'Front-end',
  'Back-end',
  'Mobile',
  'Design',
  'DevOps',
  'Others',
]
  .map(formatKeyword)
  .filter((x) => !!x);

export interface PostRecommendProps {
  keywordActive: string | undefined;
  onKeywordClick?: (keyword: string) => void;
}

export default function PostRecommend(props: PostRecommendProps) {
  const { keywordActive, onKeywordClick } = props;

  const { t } = useTranslation('postRecommend');

  const handleKeywordClick = (keyword: string) => {
    if (keyword === keywordActive) return clearKeyword();
    onKeywordClick?.(keyword);
  };

  const clearKeyword = () => {
    onKeywordClick?.('');
  };

  const isOnPC = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <Box>
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

      <Stack
        flexWrap="wrap"
        sx={
          isOnPC
            ? {
                mt: '1.5px',
                borderTop: 1,
                borderColor: 'divider',
              }
            : {}
        }
      >
        {recommendKeywords.map((keyword, idx) => (
          <Chip
            key={idx}
            color={keywordActive === keyword ? 'primary' : undefined}
            label={keyword}
            onClick={() => handleKeywordClick?.(keyword)}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: { lg: 16 },
              color: keywordActive === keyword ? 'common.white' : 'text.secondary',
            }}
          />
        ))}
        {keywordActive && recommendKeywords.every((keyword) => keyword !== keywordActive) && (
          <Chip
            color="primary"
            label={keywordActive}
            onClick={clearKeyword}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: { lg: 16 },
              color: 'common.white',
            }}
          />
        )}
        {/* {keywordActive && (
          <Chip
            label={<DeleteForeverRounded sx={{ display: 'flex', alignItems: 'center' }} />}
            color="error"
            onClick={clearKeyword}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: 16,
            }}
          />
        )} */}
      </Stack>
    </Box>
  );
}
