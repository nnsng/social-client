import { CloseRounded, SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  FormControl,
  Grow,
  List,
  ListItem,
  ListItemButton,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { blogActions, selectSearchLoading, selectSearchResultList } from 'features/blog/blogSlice';
import { IPost, ISearchObj } from 'models';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { slugifyString } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { SearchMobile } from '../SearchMobile';

export interface ISearchResult {
  list: IPost[];
  length: number;
  isMore: boolean;
}

export interface ISearchBoxProps {
  openSearchMobile?: boolean;
  toggleSearchMobile?: () => void;
}

export default function SearchBox(props: ISearchBoxProps) {
  const { openSearchMobile, toggleSearchMobile } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSearchLoading);
  const searchResultList = useAppSelector(selectSearchResultList);

  const [searchInput, setSearchInput] = useState<string>('');
  const [result, setResult] = useState<ISearchResult>({ list: [], length: 0, isMore: false });
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setShowSearchResult(searchInput.length > 0 && inputRef?.current === document.activeElement);
  }, [searchInput]);

  useEffect(() => {
    const { search, username, hashtag } = queryString.parse(location.search);
    clearSearchInput();
    if (search) setSearchInput(search as string);
    if (username) setSearchInput(`@${username}`);
    if (hashtag) setSearchInput(`#${hashtag}`);
  }, [location.search]);

  useEffect(() => {
    const MAX_ITEMS = 5;

    setResult({
      list: searchResultList.slice(0, MAX_ITEMS),
      length: searchResultList.length,
      isMore: searchResultList.length > MAX_ITEMS,
    });
  }, [searchResultList]);

  const closeSearchResult = () => setShowSearchResult(false);
  const clearSearchInput = () => setSearchInput('');

  const splitSearchInput = (searchInput: string) => {
    const searchObj: ISearchObj = {
      searchFor: 'search', // default = search
      searchTerm: searchInput,
    };

    if (searchInput[0] === '@') {
      searchObj.searchFor = 'username';
      searchObj.searchTerm = searchInput.slice(1);
    }
    if (searchInput[0] === '#') {
      searchObj.searchFor = 'hashtag';
      searchObj.searchTerm = searchInput.slice(1);
    }

    return searchObj;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { searchFor, searchTerm } = splitSearchInput(value);
    setSearchInput(value);
    dispatch(
      blogActions.searchWithDebounce({
        searchFor,
        searchTerm: slugifyString(searchTerm),
      })
    );
  };

  const handleViewMore = () => {
    const { searchFor, searchTerm } = splitSearchInput(searchInput);
    closeSearchResult();
    navigate(`/blog?${searchFor}=${searchTerm}`);
  };

  const handleInputKeyUp = (e: any) => {
    if (e.key === 'Enter') handleViewMore();
  };

  const gotoPost = (post: IPost) => {
    navigate(`/blog/post/${post.slug}`);
    clearSearchInput();
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            width: '100%',
            maxWidth: 320,
            position: { xs: 'relative', md: 'absolute' },
            top: { md: '50%' },
            left: { md: '50%' },
            transform: { md: 'translate(-50%, -50%)' },
          }}
        >
          <OutlinedInput
            placeholder={t('search.placeholder')}
            inputProps={{ ref: inputRef, sx: { pl: 1.5 } }}
            value={searchInput || ''}
            onChange={handleSearchChange}
            onKeyUp={handleInputKeyUp}
            startAdornment={<SearchRounded sx={{ color: 'action.disabled' }} />}
            endAdornment={
              (searchInput || '').length > 0 && (
                <CloseRounded
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  onClick={clearSearchInput}
                />
              )
            }
            sx={{
              borderRadius: 40,
              bgcolor: 'background.paper',
            }}
          />

          <ClickAwayListener onClickAway={closeSearchResult}>
            <Grow in={showSearchResult}>
              <Paper
                sx={{
                  ...themeMixins.paperBorder(),
                  position: 'absolute',
                  inset: '100% 0 auto',
                  maxHeight: 450,
                  mt: 1,
                  borderRadius: 0,
                  overflow: 'auto',
                }}
              >
                <Box display="flex" alignItems="center" p={2}>
                  {loading || searchInput.length < 2 ? (
                    <CircularProgress size={20} color="primary" sx={{ flexShrink: 0, mr: 1 }} />
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {t('search.result', {
                        count: result.length,
                        searchFor:
                          splitSearchInput(searchInput).searchFor !== 'search'
                            ? splitSearchInput(searchInput).searchFor
                            : '',
                        searchTerm: splitSearchInput(searchInput).searchTerm,
                      })}
                    </Typography>
                  )}
                </Box>

                <List disablePadding>
                  {result.list.map((post) => (
                    <ListItem key={post._id} disablePadding>
                      <ListItemButton disableRipple onClick={() => gotoPost(post)}>
                        <Stack alignItems="center">
                          <Avatar
                            src={post.thumbnail}
                            sx={{
                              width: 32,
                              height: 32,
                              mr: 1,
                              bgcolor: 'action.selected',
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
                        </Stack>
                      </ListItemButton>
                    </ListItem>
                  ))}

                  {result.isMore && (
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{
                          display: 'inline-block',
                          textAlign: 'center',
                          mx: 'auto',
                          py: 0.8,
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                        onClick={handleViewMore}
                      >
                        {t('search.viewMore')}
                      </Typography>
                    </Stack>
                  )}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </FormControl>
      </Box>

      <SearchMobile
        open={openSearchMobile}
        onClose={toggleSearchMobile}
        loading={loading}
        searchInput={searchInput}
        result={result}
        searchObj={splitSearchInput(searchInput)}
        onChange={handleSearchChange}
        onClear={clearSearchInput}
        onViewMore={handleViewMore}
      />
    </>
  );
}
