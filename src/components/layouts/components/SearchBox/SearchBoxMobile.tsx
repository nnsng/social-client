import { ArrowBackIosNewRounded, CloseRounded, SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { SearchObj } from '~/models';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins, themeVariables } from '~/utils/theme';
import { SearchResult } from '.';

export interface SearchMobileProps {
  loading: boolean;
  open: boolean;
  onClose?: () => void;
  result: SearchResult;
  searchObj: SearchObj;
  searchInput: string;
  onChange?: (e: any) => void;
  onClear?: () => void;
  onViewMore?: () => void;
}

export function SearchMobile(props: SearchMobileProps) {
  const { loading, open, onClose, result, searchObj, searchInput, onChange, onClear, onViewMore } =
    props;

  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const handleViewMore = () => {
    onViewMore?.();
    onClose?.();
  };

  const goto = (url: string) => {
    navigate(url);
    onClose?.();
  };

  return (
    <Dialog fullScreen open={open}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          height: themeVariables.headerHeight,
          boxShadow: themeVariables.boxShadow,
        }}
      >
        <Toolbar
          sx={{
            ...themeMixins.paperBorder('bottom'),
            height: '100%',
            borderRadius: 0,
          }}
        >
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 1 }}>
            <ArrowBackIosNewRounded sx={{ color: 'text.secondary' }} />
          </IconButton>

          <FormControl fullWidth size="small">
            <OutlinedInput
              placeholder={t('search.placeholder')}
              inputProps={{ sx: { pl: 1.5 } }}
              value={searchInput}
              onChange={onChange}
              autoFocus
              startAdornment={
                <SearchRounded sx={{ color: 'action.disabled', cursor: 'pointer' }} />
              }
              endAdornment={
                searchInput.length > 0 && (
                  <CloseRounded
                    onClick={onClear}
                    sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  />
                )
              }
              sx={{
                borderRadius: 40,
                bgcolor: 'background.paper',
              }}
            />
          </FormControl>
        </Toolbar>
      </Box>

      <Box
        position="relative"
        bgcolor="background.default"
        minHeight={`calc(100vh - ${themeVariables.headerHeight}px)`}
      >
        <Stack alignItems="center" px={2} py={1}>
          {loading || searchInput.length < 2 ? (
            <CircularProgress size={20} sx={{ flexShrink: 0, mr: 1 }} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
              {t('search.result', {
                count: result.length,
                ...searchObj,
              })}
            </Typography>
          )}
        </Stack>

        <List disablePadding>
          {searchInput.length > 1 && (
            <>
              {result.list.map((data) => (
                <ListItem key={data._id} disablePadding>
                  <ListItemButton disableRipple onClick={() => goto(data.url)}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={data.image}
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1,
                          bgcolor: 'grey.200',
                        }}
                      >
                        <Box />
                      </Avatar>

                      <Typography fontSize={15} sx={{ ...themeMixins.truncate(2) }}>
                        {data.name}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}

              {result.isMore && searchInput.length > 1 && (
                <Stack>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    onClick={handleViewMore}
                    sx={{
                      display: 'inline-block',
                      textAlign: 'center',
                      mx: 'auto',
                      py: 1,
                      cursor: 'pointer',
                    }}
                  >
                    {t('search.viewMore')}
                  </Typography>
                </Stack>
              )}
            </>
          )}
        </List>
      </Box>
    </Dialog>
  );
}
