import { User } from './auth';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  keywords: Keyword[];
  author?: User;
  likes?: string[];
  commentCount?: number;
  slug?: string;
  createdAt?: string;
}

export interface Comment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  user?: User;
  likes?: string[];
  createdAt?: string;
}

export interface Keyword {
  name: string;
  value: string;
}
