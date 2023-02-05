import { postApi, userApi } from '~/api';

export type PostByTypes = 'all' | 'following';

export type CommentActionTypes = 'create' | 'edit' | 'remove' | 'like';

export type FollowAction = 'follow' | 'unfollow';

export type ConfigTypes = 'mode' | 'mainColor' | 'language';

export type ToastTypes = 'success' | 'error' | 'warn' | 'info';

export type SearchApiType = typeof postApi | typeof userApi;
