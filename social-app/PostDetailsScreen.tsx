import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import CommentCard from './components/CommentCard';

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostDetailsScreen = ({ route }: { route: any }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}`);
        setPost(postResponse.data);

        const userResponse = await axios.get(`https://gorest.co.in/public/v2/users/${postResponse.data.user_id}`);
        setUser(userResponse.data);

        const commentsResponse = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);


  return (
    <View style={styles.container}>
      {post && user && (
        <View style={styles.post}>
          <View style={styles.userInfo}>
            <Avatar
              rounded
              size="medium"
              containerStyle={styles.avatar}
            />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      )}
      <Text style={styles.commentsTitle}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentCard comment={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#6200ee',
  },
  userName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
});

export default PostDetailsScreen;