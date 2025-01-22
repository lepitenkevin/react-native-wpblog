// src/screens/PostDetailScreen.tsx
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import RenderHTML from "react-native-render-html";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { WPPost } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "PostDetail">;

const PostDetailScreen: React.FC<Props> = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>
      {post.featured_image && (
        <Image
          source={{ uri: post.featured_image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 16,
          }}
          resizeMode="cover"
        />
      )}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        {post.title.rendered}
      </Text>
      <RenderHTML contentWidth={400} source={{ html: post.content.rendered }} />
    </ScrollView>
  );
};

export default PostDetailScreen;
