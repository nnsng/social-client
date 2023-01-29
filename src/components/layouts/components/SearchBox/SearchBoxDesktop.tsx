import { CloseRounded, SearchRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import queryString from 'query-string';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useSubmitWithEnter } from '~/hooks';
import { SearchParams } from '~/models';
import {
  commonActions,
  selectFormattedSearchResult,
  selectSearchLoading,
} from '~/redux/slices/commonSlice';
import { slugifyString } from '~/utils/common';
import { themeMixins } from '~/utils/theme';
import { showComingSoonToast } from '~/utils/toast';
import { SearchResult } from '.';

export default function SearchBoxDesktop() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('header');

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSearchLoading);
  const searchResult = useAppSelector(selectFormattedSearchResult);

  const [input, setInput] = useState('');
  const [result, setResult] = useState<SearchResult>({ list: [], length: 0, isMore: false });
  const [showResult, setShowResult] = useState(false);
  const [params, setParams] = useState<SearchParams>({
    search: 'post',
    q: input,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    clearSearchInput();

    const { search, username } = queryString.parse(location.search);
    if (search) setInput(`${search}`);
    if (username) setInput(`@${username}`);
  }, [location.search]);

  useEffect(() => {
    setShowResult(input.length > 0 && inputRef?.current === document.activeElement);

    let search = params.search;
    let q = input.trim();

    switch (input[0]) {
      case '@': {
        search = 'user';
        q = input.slice(1);
        break;
      }
      default: {
        search = 'post';
        q = input;
      }
    }

    setParams({ search, q });
  }, [input]);

  useEffect(() => {
    const { search, q } = params;
    dispatch(commonActions.searchWithDebounce({ search, q: slugifyString(q) }));
  }, [params]);

  useEffect(() => {
    const MAX_ITEMS = 5;

    setResult({
      list: searchResult.slice(0, MAX_ITEMS),
      length: searchResult.length,
      isMore: searchResult.length > MAX_ITEMS,
    });
  }, [searchResult]);

  const closeSearchResult = () => setShowResult(false);
  const clearSearchInput = () => setInput('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleViewMore = () => {
    if (params.search === 'user') {
      showComingSoonToast();
      return;
    }

    closeSearchResult();
    const { search, q } = params;
    navigate(`/search/${search}s?q=${q}`, { replace: true });
  };

  const goto = (url: string) => {
    clearSearchInput();
    navigate(url);
  };

  const onKeyUp = useSubmitWithEnter(handleViewMore);

  return (
    <Box
      display={{ xs: 'none', sm: 'block' }}
      sx={{
        width: '100%',
        maxWidth: 320,
        position: { xs: 'relative', md: 'absolute' },
        top: { md: '50%' },
        left: { md: '50%' },
        transform: { md: 'translate(-50%, -50%)' },
      }}
    >
      <TextField
        placeholder={t('search.placeholder')}
        inputProps={{ ref: inputRef }}
        value={input}
        onChange={handleSearchChange}
        onKeyUp={onKeyUp}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: <SearchRounded sx={{ color: 'action.disabled', mr: 1.5 }} />,
          endAdornment: input.length > 0 && (
            <IconButton sx={{ color: 'text.secondary' }} onClick={clearSearchInput}>
              <CloseRounded />
            </IconButton>
          ),
        }}
      />

      <ClickAwayListener onClickAway={closeSearchResult}>
        <Grow in={showResult}>
          <Paper
            sx={{
              ...themeMixins.paperBorder(),
              position: 'absolute',
              inset: '100% 0 auto',
              top: '100%',
              maxHeight: 450,
              mt: 1,
              overflow: 'auto',
            }}
          >
            <Stack alignItems="center" px={2} py={1}>
              {loading || input.length < 2 ? (
                <CircularProgress size={20} />
              ) : (
                <Typography color="text.secondary" fontSize={14}>
                  {t(`search.${params.search}.result${result.length > 1 ? 's' : ''}`, {
                    count: result.length,
                    q: params.q,
                  })}
                </Typography>
              )}
            </Stack>

            {result.list.length > 0 && <Divider />}

            <List disablePadding>
              {input.length > 1 &&
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

              {result.isMore && input.length > 1 && (
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
    </Box>
  );
}
