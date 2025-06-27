import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import PostCard from './components/PostCard';

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

const HomeScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://gorest.co.in/public/v2/posts');
        const validPosts = await Promise.all(
          response.data.map(async (post: Post) => {
            const postResponse = await axios.get(`https://gorest.co.in/public/v2/posts/${post.id}`);
            return postResponse.data;
          })
        );
        setPosts(validPosts);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;