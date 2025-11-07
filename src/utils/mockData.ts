// src/utils/mockData.ts
import { Post, User } from '../types/social.types';

const mockUsers: User[] = [
  {
    id: '2',
    username: 'sarah_photos',
    displayName: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Photographer 📸',
    followersCount: 5420,
    followingCount: 890,
    postsCount: 156,
  },
  {
    id: '3',
    username: 'mike_travel',
    displayName: 'Mike Chen',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Travel enthusiast ✈️',
    followersCount: 8930,
    followingCount: 1200,
    postsCount: 243,
  },
  {
    id: '4',
    username: 'emma_art',
    displayName: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: 'Digital artist 🎨',
    followersCount: 12500,
    followingCount: 670,
    postsCount: 89,
  },
  {
    id: '5',
    username: 'alex_fitness',
    displayName: 'Alex Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=68',
    bio: 'Fitness coach 💪',
    followersCount: 3200,
    followingCount: 450,
    postsCount: 201,
  },
];

const mockImages = [
  'https://picsum.photos/400/500?random=1',
  'https://picsum.photos/400/400?random=2',
  'https://picsum.photos/400/600?random=3',
  'https://picsum.photos/400/500?random=4',
  'https://picsum.photos/400/400?random=5',
  'https://picsum.photos/400/600?random=6',
  'https://picsum.photos/400/500?random=7',
  'https://picsum.photos/400/400?random=8',
];

const mockCaptions = [
  'Amazing sunset today 🌅',
  'Coffee and code ☕️💻',
  'Best vacation ever! 🏖️',
  'New artwork finished 🎨',
  'Morning workout done ✅',
  'Delicious lunch 🍜',
  'Beautiful architecture 🏛️',
  'Weekend vibes 😎',
];

export const generateMockPosts = (count: number = 10): Post[] => {
  return Array.from({ length: count }, (_, index) => {
    const user = mockUsers[index % mockUsers.length];
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - randomDaysAgo);

    return {
      id: `post_${index + 1}`,
      user,
      imageUrl: mockImages[index % mockImages.length],
      caption: mockCaptions[index % mockCaptions.length],
      likesCount: Math.floor(Math.random() * 10000),
      commentsCount: Math.floor(Math.random() * 500),
      isLiked: Math.random() > 0.5,
      createdAt: date,
    };
  });
};

export const mockPosts = generateMockPosts(20);