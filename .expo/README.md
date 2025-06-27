Post Cards: Display user name, avatar (initials derived from name), post title, and truncated content.
Navigation: Clicking a Post Card navigates to the Post Details screen with the post’s ID.
Post Details: Shows the full post and a scrollable list of comments.
TypeScript: Used for type safety and better developer experience.
UI/UX: Clean card-based design with shadows and rounded corners, using react-native-elements.


Steps for installation
1) npm install
2) npx expo start

Stack Navigation:
    The stack navigator enables navigation from the Home screen to the Post Details screen when a user clicks a Post Card. The PostCard component uses the useNavigation hook to push the PostDetails screen onto the stack.

    