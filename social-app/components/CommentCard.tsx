import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Avatar
          rounded
          size="small"
          containerStyle={styles.avatar}
        />
        <Text style={styles.userName}>{comment.name}</Text>
      </View>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    backgroundColor: '#03a9f4',
  },
  userName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default CommentCard;