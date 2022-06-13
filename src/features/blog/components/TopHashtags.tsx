import { Box, Chip, Stack, SxProps, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { themeVariables } from 'utils/theme';

export interface ITopHashtagsProps {
  list: string[];
  active: string | undefined;
  onHashtagClick?: (hashtag: string | undefined) => void;
}

export default function TopHashtags(props: ITopHashtagsProps) {
  const { list, active, onHashtagClick } = props;

  const { t } = useTranslation('topHashtags');

  const handleHashtagClick = (hashtag: string) => {
    if (hashtag === active) return clearHashtag();
    onHashtagClick?.(hashtag);
  };

  const clearHashtag = () => {
    onHashtagClick?.(undefined);
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
          color="text.primary"
          fontSize={14}
          fontWeight={60}
          sx={{
            display: 'inline-block',
            mb: -1,
            borderBottom: 1,
            borderColor: 'text.primary',
            cursor: 'default',
          }}
        >
          {t('title')}
        </Typography>
      )}

      <Stack flexWrap="wrap" sx={hashtagWrapperSx}>
        {list.map((hashtag, idx) => (
          <Chip
            key={idx}
            color={active === hashtag ? 'primary' : undefined}
            label={hashtag}
            onClick={() => handleHashtagClick?.(hashtag)}
            sx={{
              mt: 1,
              mr: 1,
              fontSize: { lg: 16 },
              color: active === hashtag ? 'common.white' : 'text.secondary',
            }}
          />
        ))}
        {active && !list.includes(active) && (
          <Chip
            color="primary"
            label={active}
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
