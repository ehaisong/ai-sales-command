import { SocialPost, PlatformAccount } from '@/types/socialMedia';

export const mockPlatformAccounts: PlatformAccount[] = [
  {
    accountId: 'li-1',
    platform: 'linkedin',
    accountName: '思拓外贸助手',
    isConnected: true,
    isActive: true,
    lastPostAt: '2025-07-15',
    totalPosts: 24,
    followerCount: 1280
  },
  {
    accountId: 'ig-1',
    platform: 'instagram',
    accountName: '@situo_trade',
    isConnected: true,
    isActive: true,
    lastPostAt: '2025-07-14',
    totalPosts: 45,
    followerCount: 2150
  },
  {
    accountId: 'tw-1',
    platform: 'twitter',
    accountName: '@SituoTrade',
    isConnected: false,
    isActive: false,
    lastPostAt: undefined,
    totalPosts: 0,
    followerCount: 0
  },
  {
    accountId: 'tw-2',
    platform: 'twitter',
    accountName: '@SituoMarketing',
    isConnected: false,
    isActive: false,
    lastPostAt: undefined,
    totalPosts: 10,
    followerCount: 500
  }
];

export const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'linkedin',
    content: '🚀 全新AI助手功能上线！通过智能分析客户需求，为您的外贸业务带来更精准的客户匹配。立即体验数字化营销的强大力量！',
    type: 'text',
    status: 'published',
    publishedAt: '2025-07-15T09:30:00Z',
    engagement: {
      likes: 45,
      comments: 12,
      shares: 8,
      views: 320
    },
    hashtags: ['#AI助手', '#外贸营销', '#数字化转型'],
    createdAt: '2025-07-15T09:00:00Z',
    updatedAt: '2025-07-15T09:30:00Z'
  },
  {
    id: '2',
    platform: 'instagram',
    content: '✨ 看看我们的AI助手如何帮助客户提升50%的询盘转化率！\n\n#智能营销 #外贸神器',
    type: 'image',
    status: 'published',
    publishedAt: '2025-07-14T15:20:00Z',
    imageUrls: ['/placeholder.svg'],
    engagement: {
      likes: 89,
      comments: 23,
      shares: 15
    },
    hashtags: ['#智能营销', '#外贸神器', '#AI助手'],
    createdAt: '2025-07-14T15:00:00Z',
    updatedAt: '2025-07-14T15:20:00Z'
  },
  {
    id: '3',
    platform: 'linkedin',
    content: '📊 数据驱动的营销策略：通过我们的AI分析，客户平均获得了3倍的社交媒体曝光率。想了解更多成功案例吗？',
    type: 'text',
    status: 'published',
    publishedAt: '2025-07-13T11:15:00Z',
    engagement: {
      likes: 67,
      comments: 18,
      shares: 12,
      views: 450
    },
    hashtags: ['#数据营销', '#成功案例', '#AI分析'],
    createdAt: '2025-07-13T11:00:00Z',
    updatedAt: '2025-07-13T11:15:00Z'
  },
  {
    id: '4',
    platform: 'instagram',
    content: '🎯 精准客户定位 = 更高转化率\n\n我们的AI系统帮助您找到最有价值的潜在客户',
    type: 'carousel',
    status: 'scheduled',
    scheduledAt: '2025-07-16T14:00:00Z',
    imageUrls: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    },
    hashtags: ['#精准营销', '#客户定位', '#转化率'],
    createdAt: '2025-07-15T16:30:00Z',
    updatedAt: '2025-07-15T16:30:00Z'
  },
  {
    id: '5',
    platform: 'linkedin',
    content: '🌟 客户成功故事分享：某制造业企业通过我们的AI助手，3个月内海外订单增长了150%！',
    type: 'text',
    status: 'draft',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    },
    hashtags: ['#客户成功', '#制造业', '#海外订单'],
    createdAt: '2025-07-15T18:00:00Z',
    updatedAt: '2025-07-15T18:00:00Z'
  }
];
