import { CloseRounded, SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  Divider,
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
import {
  postActions,
  selectFormattedSearchResult,
  selectSearchLoading,
} from 'features/blog/postSlice';
import { useCustomMediaQuery, useSubmitWithEnter } from 'hooks';
import { SearchObj, SearchResultItem } from 'models';
import queryString from 'query-string';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { slugifyString } from 'utils/common';
import { themeMixins } from 'utils/theme';
import { showComingSoonToast } from 'utils/toast';
import { SearchMobile } from './SearchBoxMobile';

interface SearchResult {
  list: SearchResultItem[];
  length: number;
  isMore: boolean;
}

export default function SearchBoxDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSearchLoading);
  const searchResult = useAppSelector(selectFormattedSearchResult);

  const [searchInput, setSearchInput] = useState<string>('');
  const [result, setResult] = useState<SearchResult>({ list: [], length: 0, isMore: false });
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchObj, setSearchObj] = useState<SearchObj>({
    searchFor: 'search',
    searchTerm: searchInput,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    clearSearchInput();

    const { search, username, hashtag } = queryString.parse(location.search);
    if (search) setSearchInput(`${search}`);
    if (username) setSearchInput(`@${username}`);
    if (hashtag) setSearchInput(`#${hashtag}`);
  }, [location.search]);

  useEffect(() => {
    setShowSearchResult(searchInput.length > 0 && inputRef?.current === document.activeElement);

    let searchFor = searchObj.searchFor;
    let searchTerm = searchInput.trim();

    switch (searchInput[0]) {
      case '#': {
        searchFor = 'hashtag';
        searchTerm = searchInput.slice(1);
        break;
      }
      case '@': {
        searchFor = 'username';
        searchTerm = searchInput.slice(1);
        break;
      }
      default: {
        searchFor = 'search';
        searchTerm = searchInput;
      }
    }

    setSearchObj({ searchFor, searchTerm });
  }, [searchInput]);

  useEffect(() => {
    const { searchFor, searchTerm } = searchObj;
    dispatch(
      postActions.searchWithDebounce({
        searchFor,
        searchTerm: slugifyString(searchTerm),
      })
    );
  }, [searchObj]);

  useEffect(() => {
    const MAX_ITEMS = 5;

    setResult({
      list: searchResult.slice(0, MAX_ITEMS),
      length: searchResult.length,
      isMore: searchResult.length > MAX_ITEMS,
    });
  }, [searchResult]);

  const closeSearchResult = () => setShowSearchResult(false);
  const clearSearchInput = () => setSearchInput('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleViewMore = () => {
    if (searchObj.searchFor === 'username') {
      showComingSoonToast();
      return;
    }

    closeSearchResult();
    const { searchFor, searchTerm } = searchObj;
    navigate(`/blog?${searchFor}=${searchTerm}`, { replace: true });
  };

  const goto = (url: string) => {
    clearSearchInput();
    navigate(url);
  };

  const onKeyUp = useSubmitWithEnter(handleViewMore);

  const smDown = useCustomMediaQuery('down', 'sm');

  return (
    <>
      <Box display={{ xs: 'none', sm: 'block' }}>
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
            onKeyUp={onKeyUp}
            startAdornment={<SearchRounded sx={{ color: 'action.disabled' }} />}
            endAdornment={
              (searchInput || '').length > 0 && (
                <CloseRounded
                  onClick={clearSearchInput}
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                />
              )
            }
            sx={{
              borderRadius: 10,
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
                  overflow: 'auto',
                }}
              >
                <Stack alignItems="center" px={2} py={1}>
                  {loading || searchInput.length < 2 ? (
                    <CircularProgress size={20} color="primary" />
                  ) : (
                    <Typography color="text.secondary" fontSize={14}>
                      {t(`search.${searchObj.searchFor}.result${result.length > 1 ? 's' : ''}`, {
                        count: result.length,
                        searchTerm: searchObj.searchTerm,
                      })}
                    </Typography>
                  )}
                </Stack>

                {result.list.length > 0 && <Divider />}

                <List disablePadding>
                  {searchInput.length > 1 &&
                    result.list.map((data) => (
                      <ListItem key={data._id} disablePadding>
                        <ListItemButton disableRipple onClick={() => goto(data.url)}>
                          <Stack alignItems="center">
                            <Avatar
                              src={data.image}
                              sx={{
                                width: 32,
                                height: 32,
                                mr: 1,
                                bgcolor: !data.image ? 'action.selected' : undefined,
                              }}
                            >
                              <Box />
                            </Avatar>

                            <Typography
                              fontSize={15}
                              fontWeight={500}
                              sx={{ ...themeMixins.truncate(2) }}
                            >
                              {data.name}
                            </Typography>
                          </Stack>
                        </ListItemButton>
                      </ListItem>
                    ))}

                  {result.isMore && searchInput.length > 1 && (
                    <>
                      <Divider />

                      <Stack>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          onClick={handleViewMore}
                          sx={{
                            display: 'inline-block',
                            textAlign: 'center',
                            mx: 'auto',
                            py: 0.8,
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'text.primary',
                            },
                          }}
                        >
                          {t('search.viewMore')}
                        </Typography>
                      </Stack>
                    </>
                  )}
                </List>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </FormControl>
      </Box>

      {smDown && (
        <SearchMobile
          open={false}
          loading={loading}
          searchInput={searchInput}
          result={result}
          searchObj={searchObj}
          onChange={handleSearchChange}
          onClear={clearSearchInput}
          onViewMore={handleViewMore}
        />
      )}
    </>
  );
}
