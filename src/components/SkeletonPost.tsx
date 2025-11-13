// src/components/SkeletonPost.tsx - Version avec background animé
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const SkeletonPost: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false, // FALSE pour backgroundColor
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#D1D5DB'], // Gris clair vers gris foncé
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.avatar, { backgroundColor }]} />
        <View style={styles.userInfo}>
          <Animated.View style={[styles.nameLine, { backgroundColor }]} />
          <Animated.View style={[styles.usernameLine, { backgroundColor }]} />
        </View>
      </View>

      <Animated.View style={[styles.image, { backgroundColor }]} />

      <View style={styles.actions}>
        <Animated.View style={[styles.actionButton, { backgroundColor }]} />
        <Animated.View style={[styles.actionButton, { backgroundColor }]} />
        <Animated.View style={[styles.actionButton, { backgroundColor }]} />
      </View>

      <View style={styles.captionContainer}>
        <Animated.View style={[styles.captionLine, { backgroundColor }]} />
        <Animated.View style={[styles.captionLineShort, { backgroundColor }]} />
      </View>
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
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameLine: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },
  usernameLine: {
    width: 80,
    height: 12,
    borderRadius: 4,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    gap: 16,
  },
  actionButton: {
    width: 60,
    height: 24,
    borderRadius: 12,
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  captionLine: {
    width: '90%',
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
  },
  captionLineShort: {
    width: '60%',
    height: 14,
    borderRadius: 4,
  },
});