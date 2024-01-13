import { Box, List, ListItem, Typography } from '@mui/material';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { postApi, userApi } from '~/api';
import { PostList } from '~/components/post';
import { UserCard } from '~/components/search';
import { usePageTitle } from '~/hooks';
import { Post, SearchApiType, User } from '~/models';
import { slugifyString } from '~/utils/common';

export type SearchResultType = Post | Partial<User>;

export function SearchPage() {
  const location = useLocation();
  const { type } = useParams();
  const { q } = queryString.parse(location.search);

  const { t } = useTranslation('searchPage');

  usePageTitle(t('pageTitle'));

  const [results, setResults] = useState<SearchResultType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const apiMapped: { [key: string]: SearchApiType } = {
          posts: postApi,
          users: userApi,
        };

        const api = apiMapped[type!];
        if (!api) return;

        const response = await api.search(slugifyString(q as string));
        setResults(response);
      } catch (error) {}
    })();
  }, [type, q]);

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        {t(`result${results.length > 1 ? 's' : ''}`, { count: results.length })}
      </Typography>

      {type === 'posts' ? (
        <PostList postList={results as Post[]} />
      ) : (
        <List disablePadding>
          {(results as Partial<User>[]).map((user) => (
            <ListItem key={user._id} disablePadding>
              <UserCard user={user} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
