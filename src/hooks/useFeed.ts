// src/hooks/useFeed.ts
import { useReducer, useEffect } from 'react';
import { Post, FeedState, FeedAction } from '../types/social.types';
import { mockPosts } from '../utils/mockData';

const initialState: FeedState = {
  posts: [],
  loading: false,
  refreshing: false,
  hasMore: true,
};

function feedReducer(state: FeedState, action: FeedAction): FeedState {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false,
        refreshing: false,
      };

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                isLiked: !post.isLiked,
                likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
              }
            : post
        ),
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: action.payload,
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
}

export function useFeed() {
  const [state, dispatch] = useReducer(feedReducer, initialState);

  // Charger les posts initiaux
  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // Simuler un délai réseau
    setTimeout(() => {
      dispatch({ type: 'LOAD_POSTS', payload: mockPosts.slice(0, 10) });
    }, 1000);
  };

  const refreshPosts = () => {
    dispatch({ type: 'SET_REFRESHING', payload: true });
    // Simuler un délai réseau
    setTimeout(() => {
      dispatch({ type: 'LOAD_POSTS', payload: mockPosts.slice(0, 10) });
    }, 1500);
  };

  const loadMorePosts = () => {
    if (state.loading || !state.hasMore) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    // Simuler un délai réseau
    setTimeout(() => {
      const nextPosts = mockPosts.slice(state.posts.length, state.posts.length + 5);
      dispatch({ type: 'LOAD_POSTS', payload: nextPosts });
    }, 1000);
  };

  const toggleLike = (postId: string) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: postId });
  };

  const deletePost = (postId: string) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
  };

  return {
    posts: state.posts,
    loading: state.loading,
    refreshing: state.refreshing,
    hasMore: state.hasMore,
    refreshPosts,
    loadMorePosts,
    toggleLike,
    deletePost,
    dispatch,
  };
}