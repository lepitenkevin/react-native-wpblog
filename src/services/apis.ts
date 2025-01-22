// src/services/api.ts
import axios from 'axios';
import { WPPost } from '../types';

const API_URL = 'https://kevinlepiten.com/blog/wp-json/wp/v2';

export const fetchPosts = async (): Promise<WPPost[]> => {
    try {
        const response = await axios.get<WPPost[]>(`${API_URL}/posts`);
        const posts = response.data;

        // Fetch featured images
        const postsWithImages = await Promise.all(posts.map(async (post) => {
            if (post.featured_media) {
                const mediaResponse = await axios.get(`${API_URL}/media/${post.featured_media}`);
                return { ...post, featured_image: mediaResponse.data.source_url }; // Add featured image URL
            }
            return { ...post, featured_image: null }; // No featured image
        }));

        return postsWithImages;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};