// src/types/social.types.ts

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
}

export interface FeedState {
  posts: Post[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
}

export type FeedAction =
  | { type: 'LOAD_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'DELETE_POST'; payload: string };