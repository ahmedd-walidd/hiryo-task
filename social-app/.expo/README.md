To start:
in social-app:
expo init
npm install
npx expo install @react-navigation/native @react-navigation/native-stack react-native-elements axios
npx expo start

Description:
Home Screen: Scroll through a list of posts. each post is a card with a user’s name, avatar (just their initials), title.

Post Details: Tap a post to see the full user info, content, and comments
pulls live data from the GoRest API