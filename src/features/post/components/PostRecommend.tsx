import { CancelRounded } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { Tag } from 'models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { slugifyString } from 'utils';

const tags: Tag[] = ['Front-end', 'Back-end', 'Mobile app', 'Design', 'DevOps', 'Others'].map(
  (tag) => ({
    name: tag,
    value: slugifyString(tag),
  })
);

export interface PostRecommendProps {
  tagActive: string | undefined;
  onTagClick?: (tag: Tag) => void;
}

export default function PostRecommend({ tagActive, onTagClick }: PostRecommendProps) {
  const handleTagClick = (tag: Tag) => {
    if (tag.value === tagActive) return;

    onTagClick?.(tag);
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
        {tags.map((tag, idx) => (
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
              bgcolor: tagActive === tag.value ? 'primary.main' : 'grey.200',
              color: tagActive === tag.value ? 'primary.contrastText' : 'text.primary',

              ':hover': {
                bgcolor: tagActive === tag.value ? 'none' : 'grey.300',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleTagClick?.(tag)}
          >
            <Typography component="span" display="block">
              {tag.name}
            </Typography>

            {tagActive === tag.value && (
              <CancelRounded sx={{ ml: 1 }} onClick={() => handleTagClick({} as Tag)} />
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
