import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PostCard = ({ post }: { post: Post }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users/${post.user_id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [post.user_id]);


  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetails', { postId: post.id })}
    >
      {user && (
        <View style={styles.userInfo}>
          <Avatar
            rounded
            size="small"
            containerStyle={styles.avatar}
          />
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      )}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
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
});

export default PostCard;