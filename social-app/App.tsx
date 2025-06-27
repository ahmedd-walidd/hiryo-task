import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PostDetailsScreen from './PostDetailsScreen';
import { RootStackParamList } from './types/navigation';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="PostDetails"
          component={PostDetailsScreen}
          options={{ title: 'Post Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}