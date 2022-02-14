import { SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  Container,
  FormControl,
  Grid,
  Grow,
  Hidden,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  postActions,
  selectPostLoading,
  selectSearchLoading,
  selectSearchResultList,
} from 'features/post/postSlice';
import { Post } from 'models';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import theme, { themeConstants, mixins } from 'utils/theme';
import { slugifyString } from 'utils/common';
import { SearchMobile } from '../SearchMobile';
import DrawerMobile from './DrawerMobile';
import Notification from './Notification';
import UserMenu from './UserMenu';

export function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostLoading);
  const searchLoading = useAppSelector(selectSearchLoading);
  const searchResultList = useAppSelector(selectSearchResultList);

  const [searchInput, setSearchInput] = useState<string>('');
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);

  useEffect(() => {
    if (searchInput.length > 0) {
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  }, [searchInput]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchInput(value);
    dispatch(postActions.searchWithDebounce(slugifyString(value)));
  };

  const gotoPost = (post: Post) => {
    navigate(`/blog/${post.slug}`);
    setSearchInput('');
  };

  const toggleSearchMobile = () => setOpenSearchMobile(!openSearchMobile);

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          height: themeConstants.headerHeight,
          py: 2,
          backgroundColor: 'background.default',
          boxShadow: themeConstants.boxShadow,
          userSelect: 'none',
        }}
      >
        {loading && (
          <Box position="absolute" top="0" width="100%">
            <LinearProgress color="primary" sx={{ height: 3 }} />
          </Box>
        )}

        <Container maxWidth={false}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs="auto" mr={2}>
              <Stack direction="row" alignItems="center" component={Link} to="/">
                <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', mr: 1, fontWeight: 600 }}>
                  B
                </Avatar>

                <Typography variant="h6" color="primary" fontWeight="600">
                  BLOG APP
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    position: { xs: 'relative', md: 'absolute' },
                    top: { xs: 0, md: '50%' },
                    left: { xs: 0, md: '50%' },
                    transform: { xs: 'none', md: 'translate(-50%, -50%)' },
                  }}
                >
                  <OutlinedInput
                    placeholder="Tìm kiếm bài viết"
                    inputProps={{ sx: { pl: 1.5 } }}
                    value={searchInput}
                    onChange={handleSearchChange}
                    startAdornment={<SearchRounded sx={{ color: 'text.secondary' }} />}
                  />

                  <ClickAwayListener onClickAway={() => setShowSearchResult(false)}>
                    <Grow in={showSearchResult}>
                      <Paper
                        elevation={0}
                        sx={{
                          position: 'absolute',
                          inset: '100% 0 auto 0',
                          maxHeight: 450,
                          mt: 1,
                          bgcolor: 'background.default',
                          boxShadow: themeConstants.boxShadow,
                          overflow: 'scroll',
                        }}
                      >
                        <Box display="flex" alignItems="center" p={2}>
                          {searchLoading && (
                            <CircularProgress
                              size={20}
                              color="primary"
                              sx={{ flexShrink: 0, mr: 1 }}
                            />
                          )}

                          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                            {searchResultList.length === 0 && !searchLoading
                              ? `Không có kết quả tìm kiếm cho "${searchInput}"`
                              : `Kết quả tìm kiếm cho "${searchInput}"`}
                          </Typography>
                        </Box>

                        <List disablePadding>
                          {searchInput.length > 1 &&
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

                                    <Typography
                                      variant="subtitle2"
                                      fontSize={15}
                                      sx={{ ...mixins.truncate(2) }}
                                    >
                                      {post.title}
                                    </Typography>
                                  </Box>
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>
                      </Paper>
                    </Grow>
                  </ClickAwayListener>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs="auto" ml={2}>
              <Box display="flex" alignItems="center" ml="auto">
                <Hidden smUp>
                  <IconButton
                    disableTouchRipple
                    sx={{
                      mr: 1,
                      color: 'text.secondary',
                      fontSize: 18,

                      ':hover': {
                        backgroundColor: 'transparent',
                        color: 'text.primary',
                      },
                    }}
                    onClick={toggleSearchMobile}
                  >
                    <SearchRounded />
                  </IconButton>

                  <Notification />

                  <DrawerMobile />
                </Hidden>

                <Hidden smDown>
                  <Notification />

                  <UserMenu />
                </Hidden>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <SearchMobile
        open={openSearchMobile}
        onClose={toggleSearchMobile}
        loading={searchLoading}
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        searchResultList={searchResultList}
      />
    </>
  );
}
