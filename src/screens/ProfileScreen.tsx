// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { mockPosts } from '../utils/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH / 3;

export const ProfileScreen: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  // Photos de l'utilisateur (mock)
  const userPosts = mockPosts.slice(0, 9);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.username}>@{currentUser.username}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{currentUser.postsCount}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{currentUser.followersCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{currentUser.followingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.displayName}>{currentUser.displayName}</Text>
          {currentUser.bio && (
            <Text style={styles.bio}>{currentUser.bio}</Text>
          )}
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Modifier le profil</Text>
        </TouchableOpacity>

        {/* Photos Grid */}
        <View style={styles.grid}>
          {userPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.gridItem}>
              <Image source={{ uri: post.imageUrl }} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  editButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});