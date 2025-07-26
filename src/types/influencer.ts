export type SocialPlatform = 'instagram' | 'youtube' | 'tiktok' | 'x' | 'meta';

export interface Influencer {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  country: string;
  countryFlag: string;
  platform: SocialPlatform;
  topics: string[];
  verified: boolean;
  lastActiveAt: string;
  avgLikes: number;
  avgComments: number;
  brandMatchScore: number; // 与品牌匹配度评分 0-100
}

export interface InfluencerFilters {
  platform: SocialPlatform | 'all';
  minFollowers: number;
  maxFollowers: number;
  minEngagementRate: number;
  country: string;
  topics: string[];
}