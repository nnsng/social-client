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
import { SearchRounded, CloseRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { themeConstants, mixins } from 'utils/theme';

export interface SearchMobileProps {
  loading?: boolean;
  open?: boolean;
  onClose?: () => void;
  searchResultList?: Post[];
  searchInput?: string;
  onSearchChange?: (e: any) => void;
}

export function SearchMobile(props: SearchMobileProps) {
  const { loading, open, onClose, searchResultList, searchInput, onSearchChange } = props;

  const navigate = useNavigate();

  const gotoPost = (post: Post) => {
    navigate(`/blog/${post.slug}`);
    onClose?.();
  };

  return (
    <Dialog fullScreen open={open || false}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          height: themeConstants.headerHeight,
          backgroundColor: 'background.default',
          boxShadow: themeConstants.boxShadow,
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
          <FormControl fullWidth size="small" sx={{ mr: 3 }}>
            <OutlinedInput
              placeholder="Tìm kiếm bài viết"
              inputProps={{ sx: { pl: 1.5 } }}
              value={searchInput || ''}
              onChange={onSearchChange}
              startAdornment={<SearchRounded sx={{ color: 'text.secondary' }} />}
            />
          </FormControl>

          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseRounded sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Toolbar>
      </Box>

      <Box position="relative">
        <Box display="flex" alignItems="center" p={2}>
          {loading && <CircularProgress size={20} color="primary" sx={{ flexShrink: 0, mr: 1 }} />}

          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            {searchInput?.length !== 0 &&
              (searchResultList?.length === 0 && !loading
                ? `Không có kết quả tìm kiếm cho "${searchInput}"`
                : `Kết quả tìm kiếm cho "${searchInput}"`)}
          </Typography>
        </Box>

        <List disablePadding>
          {searchResultList &&
            searchResultList.map((post) => (
              <ListItem key={post._id} disablePadding>
                <ListItemButton disableRipple onClick={() => gotoPost(post)}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={post.thumbnail}
                      sx={{
                        ...mixins.size(32),
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
