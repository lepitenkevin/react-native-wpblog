// src/screens/PostListScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { fetchPosts } from "../services/apis";
import { WPPost } from "../types";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "PostList">;

const PostListScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetail", { post: item })}
          >
            <View
              style={{
                marginBottom: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "#ccc",
              }}
            >
              {item.featured_image && (
                <Image
                  source={{ uri: item.featured_image }}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                  resizeMode="cover"
                />
              )}
              <Text style={{ fontWeight: "bold" }}>{item.title.rendered}</Text>
              <Text>
                {item.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 200)}
                {item.excerpt.rendered.replace(/<[^>]+>/g, "").length > 200
                  ? "..."
                  : ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PostListScreen;
