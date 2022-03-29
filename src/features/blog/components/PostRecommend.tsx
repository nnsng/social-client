import { CancelRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Keyword } from 'models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { slugifyString } from 'utils/common';

const keywords: Keyword[] = [
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

export default function PostRecommend({ keywordActive, onKeywordClick }: PostRecommendProps) {
  const handleKeywordClick = (keyword: Keyword) => {
    if (keyword.value === keywordActive) return;

    onKeywordClick?.(keyword);
  };

  return (
    <Box sx={{ userSelect: 'none' }}>
      <Typography
        variant="button"
        sx={{
          display: 'block',
          mb: -1,
          borderBottom: 1,
          borderColor: 'text.secondary',
          color: 'text.secondary',
          fontWeight: 600,
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT
      </Typography>

      <Box display="flex" flexWrap="wrap" pt={1}>
        {keywords.map((keyword, idx) => (
          <Stack
            key={idx}
            direction="row"
            alignItems="center"
            sx={{
              mt: 1,
              mr: 1,
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              transition: 'easing.easeInOut',
              bgcolor: keywordActive === keyword.value ? 'primary.main' : 'grey.200',
              color: keywordActive === keyword.value ? 'primary.contrastText' : 'text.primary',

              ':hover': {
                bgcolor: keywordActive === keyword.value ? 'none' : 'grey.300',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleKeywordClick?.(keyword)}
          >
            <Typography component="span" display="block">
              {keyword.name}
            </Typography>

            {keywordActive === keyword.value && (
              <CancelRounded sx={{ ml: 1 }} onClick={() => handleKeywordClick({} as Keyword)} />
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
