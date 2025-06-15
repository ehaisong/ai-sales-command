
export type SocialPlatform = 'linkedin' | 'instagram' | 'twitter' | 'all';

export type PostStatus = 'published' | 'scheduled' | 'draft' | 'failed';

export type PostType = 'text' | 'image' | 'video' | 'carousel';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  type: PostType;
  status: PostStatus;
  publishedAt?: string;
  scheduledAt?: string;
  imageUrls?: string[];
  videoUrl?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PlatformAccount {
  accountId: string;
  platform: SocialPlatform;
  accountName: string;
  isConnected: boolean;
  isActive: boolean;
  lastPostAt?: string;
  totalPosts: number;
  followerCount: number;
}
