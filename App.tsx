// App.tsx
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { FeedScreen } from './src/screens/FeedScreen';

export default function App() {
  return (
    <AuthProvider>
      <FeedScreen />
    </AuthProvider>
  );
}
