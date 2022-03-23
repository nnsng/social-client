import { User } from './auth';

export interface Comment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  user?: User;
  likes?: string[];
  createdAt?: string;

  [key: string]: any;
}

export interface Keyword {
  name: string;
  value: string;
}

export interface Post {
  _id?: string;
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  authorId: string;
  keywords: Keyword[];
  author?: User;
  likes?: string[];
  commentCount?: number;
  slug?: string;
  createdAt?: string;

  [key: string]: any;
}
