import { IUser } from './auth';

export interface IPost {
  _id?: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  hashtags: string[];
  author?: IUser;
  likes?: string[];
  likeCount?: number;
  commentCount?: number;
  slug?: string;
  createdAt?: string;
}

export interface IComment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  user?: IUser;
  likes?: string[];
  edited?: boolean;
  createdAt?: string;
}

export interface ISearchObj {
  searchFor: 'search' | 'username' | 'hashtag';
  searchTerm: string;
}

export interface ISearchFilter {
  search?: string;
  username?: string;
  hashtag?: string;
}
