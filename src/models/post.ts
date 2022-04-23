import { User } from './auth';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  keywords: string[];
  author?: User;
  likes?: string[];
  statistics?: PostStatistics;
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

export interface PostStatistics {
  likeCount: number;
  commentCount: number;
  viewCount: number;
}
