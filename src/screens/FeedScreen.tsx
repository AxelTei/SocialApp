// src/screens/FeedScreen.tsx
import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  SafeAreaView,
} from 'react-native';
import { PostCard } from '../components/PostCard';
import { useFeed } from '../hooks/useFeed';
import { Post } from '../types/social.types';
import { Modal } from 'react-native';
import { CommentsScreen } from './CommentsScreen';
import { SkeletonPost } from '../components/SkeletonPost';

export const FeedScreen: React.FC = () => {
  const { posts, loading, refreshing, hasMore, refreshPosts, loadMorePosts, toggleLike } = useFeed();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const handleComment = (post: Post) => {
    setSelectedPost(post);
    setCommentsVisible(true);
  };

  const handleProfile = (userId: string) => {
    console.log('Open profile:', userId);
    // On implémentera ça plus tard
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aucun post pour le moment</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={toggleLike}
            onComment={handleComment}
            onProfile={handleProfile}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshPosts} />
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={commentsVisible}
        animationType='slide'
        onRequestClose={() => setCommentsVisible(false)}
      >
        {selectedPost && (
          <CommentsScreen
            post={selectedPost}
            onClose={() => setCommentsVisible(false)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
});