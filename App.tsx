// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostListScreen from "./src/screens/PostListScreen";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import { WPPost } from "./src/types";

export type RootStackParamList = {
  PostList: undefined;
  PostDetail: { post: WPPost };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PostList">
        <Stack.Screen
          name="PostList"
          component={PostListScreen}
          options={{ title: "Posts" }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: "Post Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
