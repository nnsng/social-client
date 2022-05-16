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
import { IPost, ISearchObj } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { themeMixins, themeVariables } from 'utils/theme';
import { ISearchResult } from './Header/SearchBox';

export interface ISearchMobileProps {
  loading?: boolean;
  open?: boolean;
  onClose?: () => void;
  result: ISearchResult;
  searchObj?: ISearchObj;
  searchInput?: string;
  onChange?: (e: any) => void;
  onClear?: () => void;
  onViewMore?: () => void;
}

export function SearchMobile(props: ISearchMobileProps) {
  const { loading, open, onClose, result, searchObj, searchInput, onChange, onClear, onViewMore } =
    props;

  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const handleViewMore = () => {
    onViewMore?.();
    onClose?.();
  };

  const gotoPost = (post: IPost) => {
    navigate(`/blog/post/${post.slug}`);
    onClose?.();
  };

  return (
    <Dialog fullScreen open={!!open}>
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
              value={searchInput || ''}
              onChange={onChange}
              autoFocus
              startAdornment={
                <SearchRounded sx={{ color: 'action.disabled', cursor: 'pointer' }} />
              }
              endAdornment={
                (searchInput || '').length > 0 && (
                  <CloseRounded
                    sx={{ color: 'text.secondary', cursor: 'pointer' }}
                    onClick={onClear}
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
        <Stack alignItems="center" p={2}>
          {loading && <CircularProgress size={20} color="primary" sx={{ flexShrink: 0, mr: 1 }} />}

          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            {!loading &&
              (searchInput || '').length > 0 &&
              t('search.result', {
                count: result.length,
                searchFor: searchObj?.searchFor,
                searchTerm: searchObj?.searchTerm,
              })}
          </Typography>
        </Stack>

        <List disablePadding>
          {(searchInput || '').length > 1 && (
            <>
              {result.list.map((post) => (
                <ListItem key={post._id} disablePadding>
                  <ListItemButton disableRipple onClick={() => gotoPost(post)}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={post.thumbnail}
                        sx={{
                          width: 32,
                          height: 32,
                          mr: 1,
                          bgcolor: 'grey.200',
                        }}
                      >
                        <Box />
                      </Avatar>

                      <Typography
                        variant="subtitle2"
                        fontSize={15}
                        sx={{ ...themeMixins.truncate(2) }}
                      >
                        {post.title}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}

              {result.isMore && (
                <Stack>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    sx={{
                      display: 'inline-block',
                      textAlign: 'center',
                      mx: 'auto',
                      py: 0.8,
                      cursor: 'pointer',
                    }}
                    onClick={handleViewMore}
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
