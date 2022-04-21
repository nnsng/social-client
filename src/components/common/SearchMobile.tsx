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
  Toolbar,
  Typography,
} from '@mui/material';
import { Post } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { mixins, themeVariables } from 'utils/theme';

export interface SearchMobileProps {
  loading?: boolean;
  open?: boolean;
  onClose?: () => void;
  result?: Post[];
  inputValue?: string;
  onChange?: (e: any) => void;
  onClear?: () => void;
}

export function SearchMobile(props: SearchMobileProps) {
  const { loading, open, onClose, result, inputValue, onChange, onClear } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('header');

  const gotoPost = (post: Post) => {
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
          backgroundColor: 'background.default',
          boxShadow: themeVariables.boxShadow,
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBackIosNewRounded sx={{ color: 'text.secondary' }} />
          </IconButton>

          <FormControl fullWidth size="small">
            <OutlinedInput
              placeholder={t('search.placeholder')}
              inputProps={{ sx: { pl: 1.5 } }}
              value={inputValue || ''}
              onChange={onChange}
              autoFocus
              startAdornment={
                <SearchRounded sx={{ color: 'action.disabled', cursor: 'pointer' }} />
              }
              endAdornment={
                (inputValue || '').length > 0 && (
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

      <Box position="relative">
        <Box display="flex" alignItems="center" p={2}>
          {loading && <CircularProgress size={20} color="primary" sx={{ flexShrink: 0, mr: 1 }} />}

          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            {!loading &&
              (inputValue || '').length > 0 &&
              t('search.result', {
                count: result?.length,
                searchTerm: inputValue,
              })}
          </Typography>
        </Box>

        <List disablePadding>
          {(inputValue || '').length > 1 &&
            result &&
            result.map((post) => (
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

                    <Typography variant="subtitle2" fontSize={15} sx={{ ...mixins.truncate(2) }}>
                      {post.title}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Dialog>
  );
}
