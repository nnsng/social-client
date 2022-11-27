import { Box, Chip, Stack, SxProps, Typography } from '@mui/material';
import { useCustomMediaQuery } from 'hooks';
import { useTranslation } from 'react-i18next';
import { themeVariables } from 'utils/theme';

export interface TopHashtagsProps {
  list: string[];
  active: string | undefined;
  onHashtagClick?: (hashtag: string | undefined) => void;
}

export function TopHashtags(props: TopHashtagsProps) {
  const { list, active, onHashtagClick } = props;

  const { t } = useTranslation('topHashtags');

  const handleHashtagClick = (hashtag: string) => {
    if (hashtag === active) return clearHashtag();
    onHashtagClick?.(hashtag);
  };

  const clearHashtag = () => {
    onHashtagClick?.(undefined);
  };

  const lgUp = useCustomMediaQuery('up', 'lg');

  const hashtagWrapperSx: SxProps = lgUp
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
        top: themeVariables.headerHeight + 16,
      }}
    >
      {lgUp && (
        <Typography
          variant="button"
          color="text.primary"
          fontSize={14}
          fontWeight={600}
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
        {list.length > 0
          ? list.map((hashtag, idx) => (
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
            ))
          : !active && (
              <Typography
                color="text.secondary"
                fontSize={14}
                sx={{
                  display: { xs: 'none', lg: 'block' },
                  py: 1,
                }}
              >
                {t('empty')}
              </Typography>
            )}
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
