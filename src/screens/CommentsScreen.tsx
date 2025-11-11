// src/screens/CommentsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Post, Comment } from '../types/social.types';
import { useAuth } from '../context/AuthContext';

interface CommentsScreenProps {
  post: Post;
  onClose: () => void;
}

// Mock comments
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'sarah_photos',
      displayName: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
    },
    text: 'Superbe photo ! 😍',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    user: {
      id: '3',
      username: 'mike_travel',
      displayName: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=33',
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
    },
    text: 'Incroyable ! Où est-ce ?',
    createdAt: new Date(Date.now() - 7200000),
  },
];

export const CommentsScreen: React.FC<CommentsScreenProps> = ({ post, onClose }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!commentText.trim() || !currentUser) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      text: commentText.trim(),
      createdAt: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'À l\'instant';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}j`;
    return date.toLocaleDateString('fr-FR');
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.user.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>@{item.user.username}</Text>
          <Text style={styles.commentDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Commentaires</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Post Info */}
        <View style={styles.postInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
          <View style={styles.postContent}>
            <Text style={styles.postUsername}>@{post.user.username}</Text>
            <Text style={styles.postCaption}>{post.caption}</Text>
          </View>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          contentContainerStyle={styles.commentsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucun commentaire pour le moment</Text>
              <Text style={styles.emptySubtext}>Soyez le premier à commenter !</Text>
            </View>
          }
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <Image source={{ uri: currentUser?.avatar }} style={styles.inputAvatar} />
          <TextInput
            style={styles.input}
            placeholder="Ajouter un commentaire..."
            placeholderTextColor="#9CA3AF"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            onPress={handleAddComment}
            disabled={!commentText.trim()}
          >
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    fontSize: 24,
    color: '#1F2937',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  postInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postContent: {
    flex: 1,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  postCaption: {
    fontSize: 14,
    color: '#6B7280',
  },
  commentsList: {
    paddingVertical: 8,
  },
  commentItem: {
    flexDirection: 'row',
    padding: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  commentDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1F2937',
    maxHeight: 80,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
});