import { User } from './user';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  thumbnail: string;
  description: string;
  authorId: string;
  author?: User;
  likes?: string[];
  likeCount?: number;
  commentCount?: number;
  slug?: string;
  createdAt?: string;
}

export type PostFormValues = Pick<Post, 'title' | 'content' | 'thumbnail' | 'description'>;

export interface Comment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  user?: User;
  likes?: string[];
  edited?: boolean;
  createdAt?: string;
}
