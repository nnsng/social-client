import { DeleteForeverRounded } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Keyword } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { slugifyString } from 'utils/common';

const keywordList: Keyword[] = [
  'Front-end',
  'Back-end',
  'Mobile app',
  'Design',
  'DevOps',
  'Others',
].map((keyword) => ({
  name: keyword,
  value: slugifyString(keyword),
}));

export interface PostRecommendProps {
  keywordActive: string | undefined;
  onKeywordClick?: (keyword: Keyword) => void;
}

export default function PostRecommend(props: PostRecommendProps) {
  const { keywordActive, onKeywordClick } = props;

  const { t } = useTranslation('postRecommend');

  const handleKeywordClick = (keyword: Keyword) => {
    if (keyword.value === keywordActive) return;
    onKeywordClick?.(keyword);
  };

  const clearKeyword = () => {
    onKeywordClick?.({} as Keyword);
  };

  return (
    <Box sx={{ userSelect: 'none' }}>
      <Typography
        variant="button"
        sx={{
          display: 'block',
          mb: -1,
          borderBottom: 1,
          borderColor: 'text.primary',
          color: 'text.primary',
          fontWeight: 600,
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        {t('title')}
      </Typography>

      <Stack direction="row" flexWrap="wrap" pt={1}>
        {keywordList.map((keyword, idx) => (
          <Chip
            key={idx}
            variant={keywordActive === keyword.value ? undefined : 'outlined'}
            color={keywordActive === keyword.value ? 'primary' : undefined}
            label={keyword.name}
            onClick={() => handleKeywordClick?.(keyword)}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: 16,
            }}
          />
        ))}
        {keywordActive && (
          <Chip
            variant="outlined"
            label={
              <Stack direction="row" alignItems="center">
                <DeleteForeverRounded />
                {/* {t('clear')} */}
              </Stack>
            }
            color="error"
            onClick={clearKeyword}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: 16,
            }}
          />
        )}
      </Stack>
    </Box>
  );
}
