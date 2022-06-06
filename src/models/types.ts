import { IUserConfig } from './auth';

// post
export type PostByType = 'all' | 'following';
export type PostActionType = 'save' | 'remove';

// comment
export type CommentActionType = 'create' | 'edit' | 'remove' | 'like';

// notification
export type NotiType = 'like' | 'comment' | 'follow' | 'report';

// others
export type FollowModeType = 'follow' | 'unfollow';
export type ConfigKey = keyof IUserConfig;
