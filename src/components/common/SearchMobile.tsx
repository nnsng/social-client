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
import { IPost } from 'models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { mixins, themeVariables } from 'utils/theme';

export interface ISearchMobileProps {
  loading?: boolean;
  open?: boolean;
  onClose?: () => void;
  result?: IPost[];
  inputValue?: string;
  onChange?: (e: any) => void;
  onClear?: () => void;
}

export function SearchMobile(props: ISearchMobileProps) {
  const { loading, open, onClose, result, inputValue, onChange, onClear } = props;

  const navigate = useNavigate();

  const { t } = useTranslation('header');

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
            height: '100%',
            bgcolor: 'background.paper',
            boxShadow: (theme) =>
              theme.palette.mode === 'light' ? themeVariables.boxShadow : undefined,
            borderBottom: (theme) => (theme.palette.mode === 'dark' ? 1 : undefined),
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'divider' : undefined),
          }}
        >
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 1 }}>
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

      <Box
        position="relative"
        bgcolor="background.default"
        minHeight={`calc(100vh - ${themeVariables.headerHeight})`}
      >
        <Stack alignItems="center" p={2}>
          {loading && <CircularProgress size={20} color="primary" sx={{ flexShrink: 0, mr: 1 }} />}

          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            {!loading &&
              (inputValue || '').length > 0 &&
              t('search.result', {
                count: result?.length,
                searchTerm: inputValue,
              })}
          </Typography>
        </Stack>

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
