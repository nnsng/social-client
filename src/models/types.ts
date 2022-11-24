// post
export type PostByType = 'all' | 'following';

// comment
export type CommentActionType = 'create' | 'edit' | 'remove' | 'like';

// notification
export type NotiType = 'like' | 'comment' | 'follow' | 'report';

// others
export type FollowModeType = 'follow' | 'unfollow';

export type ConfigKey = 'mode' | 'mainColor' | 'language';
