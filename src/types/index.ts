// src/types/index.ts
export interface WPPost {
    id: number;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    featured_media: number; // Media ID
    featured_image?: string | null; // URL of the featured image
}
