// src/components/PostCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Post } from '../types/social.types';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (post: Post) => void;
  onProfile: (userId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onProfile,
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `Il y a ${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `Il y a ${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `Il y a ${Math.floor(diffInSeconds / 86400)}j`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={() => onProfile(post.user.id)}
        >
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.displayName}>{post.user.displayName}</Text>
            <Text style={styles.username}>@{post.user.username}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
      </View>

      {/* Image */}
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <Text style={styles.actionIcon}>{post.isLiked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionText}>{post.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment(post)}
        >
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📤</Text>
        </TouchableOpacity>
      </View>

      {/* Caption */}
      {post.caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>@{post.user.username}</Text>
            {' '}{post.caption}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  displayName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  username: {
    fontSize: 13,
    color: '#6B7280',
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  postImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: '#F3F4F6',
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  caption: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  captionUsername: {
    fontWeight: '600',
  },
});