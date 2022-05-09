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
  statistics?: IPostStatistics;
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
  createdAt?: string;
}

export interface IPostStatistics {
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

export type ISearchFor = 'search' | 'username' | 'hashtag';
export interface ISearchObj {
  searchFor: ISearchFor;
  searchTerm: string;
}
