import { Box, ListItemButton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SettingTabItem } from '~/models';

interface SettingTabProps {
  tabs: SettingTabItem[];
  activeTab: string;
}

export function SettingTabs({ tabs, activeTab }: SettingTabProps) {
  const navigate = useNavigate();

  return (
    <Box width={{ xs: '100%', md: 200 }}>
      <Stack direction={{ xs: 'row', md: 'column' }}>
        {tabs.map((tab, idx) => (
          <ListItemButton
            key={idx}
            selected={tab.tab === activeTab}
            sx={{
              py: 2,
              px: { xs: 1, md: 3 },
              borderRightWidth: { xs: 0, md: 2 },
              borderBottomWidth: { xs: 2, md: 0 },
              borderStyle: 'solid',
              borderColor: 'transparent',
              justifyContent: { xs: 'center', md: 'flex-start' },

              '&:hover': {
                borderColor: 'action.selected',
              },

              '&.Mui-selected': {
                color: 'primary.main',
                borderColor: 'primary.main',
                fontWeight: 500,
              },
            }}
            onClick={() => navigate(`/settings?tab=${tab.tab}`)}
          >
            <Typography variant="subtitle2" component="span">
              {tab.label}
            </Typography>
          </ListItemButton>
        ))}
      </Stack>
    </Box>
  );
}
