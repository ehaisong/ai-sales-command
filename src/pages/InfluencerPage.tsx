import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, Filter, Mail, Shield, ArrowUpDown } from 'lucide-react';
import { Influencer, InfluencerFilters, SocialPlatform } from '@/types/influencer';

// Mock data for influencers
const mockInfluencers: Influencer[] = [
  {
    id: '1',
    rank: 1,
    name: 'Emma Rodriguez',
    handle: '@emmalifestyle',
    avatar: '/lovable-uploads/0f249b3c-1548-4350-8ecc-d6f2035b6de7.png',
    followers: 8500000,
    engagementRate: 3.2,
    country: 'United States',
    countryFlag: '🇺🇸',
    platform: 'instagram',
    topics: ['Family', 'Lifestyle', 'Travel', 'Parenting'],
    verified: true,
    lastActiveAt: '2024-01-26',
    avgLikes: 280000,
    avgComments: 15000,
    brandMatchScore: 96
  },
  {
    id: '2',
    rank: 2,
    name: 'Sofia Chen',
    handle: '@sofiabeauty',
    avatar: '/lovable-uploads/4df540b4-6a10-475f-aa91-f370945c97ef.png',
    followers: 12300000,
    engagementRate: 2.8,
    country: 'China',
    countryFlag: '🇨🇳',
    platform: 'instagram',
    topics: ['Beauty', 'Skincare', 'Fashion', 'Wellness'],
    verified: true,
    lastActiveAt: '2024-01-25',
    avgLikes: 350000,
    avgComments: 22000,
    brandMatchScore: 94
  },
  {
    id: '3',
    rank: 3,
    name: 'Aria Williams',
    handle: '@ariamakeup',
    avatar: '/lovable-uploads/afb27241-f57c-4aa7-8066-a6b587213c5e.png',
    followers: 15600000,
    engagementRate: 2.5,
    country: 'United States',
    countryFlag: '🇺🇸',
    platform: 'instagram',
    topics: ['Beauty', 'Makeup', 'Cosmetics', 'Tutorial'],
    verified: true,
    lastActiveAt: '2024-01-26',
    avgLikes: 420000,
    avgComments: 28000,
    brandMatchScore: 92
  },
  {
    id: '4',
    rank: 4,
    name: 'Luna Martinez',
    handle: '@lunaglam',
    avatar: '/lovable-uploads/b986da5d-99e7-4cf5-9a72-dc08bf84f039.png',
    followers: 9800000,
    engagementRate: 3.1,
    country: 'Spain',
    countryFlag: '🇪🇸',
    platform: 'instagram',
    topics: ['Fashion', 'Luxury', 'Style', 'Events'],
    verified: true,
    lastActiveAt: '2024-01-24',
    avgLikes: 310000,
    avgComments: 18500,
    brandMatchScore: 90
  },
  {
    id: '5',
    rank: 5,
    name: 'Zara Johnson',
    handle: '@zaramusic',
    avatar: '/lovable-uploads/5a5b3f54-3046-4f1c-a520-9a39a9ec0e96.png',
    followers: 22100000,
    engagementRate: 2.2,
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    platform: 'instagram',
    topics: ['Music', 'Entertainment', 'Performance', 'Art'],
    verified: true,
    lastActiveAt: '2024-01-25',
    avgLikes: 520000,
    avgComments: 35000,
    brandMatchScore: 88
  },
  {
    id: '6',
    rank: 6,
    name: 'Alex & Maya',
    handle: '@alexmayacouple',
    avatar: '/lovable-uploads/35e69ba5-3e0b-4322-9357-bde4d618adb3.png',
    followers: 6700000,
    engagementRate: 4.1,
    country: 'Canada',
    countryFlag: '🇨🇦',
    platform: 'youtube',
    topics: ['Couple Goals', 'Travel', 'Adventure', 'Vlogs'],
    verified: true,
    lastActiveAt: '2024-01-26',
    avgLikes: 185000,
    avgComments: 12000,
    brandMatchScore: 86
  },
  {
    id: '7',
    rank: 7,
    name: 'Maya Patel',
    handle: '@mayafitness',
    avatar: '/lovable-uploads/515beaa6-06a7-4d91-85dd-09233ccbf7d0.png',
    followers: 11200000,
    engagementRate: 2.7,
    country: 'India',
    countryFlag: '🇮🇳',
    platform: 'instagram',
    topics: ['Fitness', 'Health', 'Yoga', 'Wellness'],
    verified: true,
    lastActiveAt: '2024-01-23',
    avgLikes: 295000,
    avgComments: 19000,
    brandMatchScore: 84
  },
  {
    id: '8',
    rank: 8,
    name: 'James Thompson',
    handle: '@jamestech',
    avatar: '/lovable-uploads/863076f0-5e79-4bb1-a8e5-587a8c9ce88c.png',
    followers: 8900000,
    engagementRate: 3.4,
    country: 'Australia',
    countryFlag: '🇦🇺',
    platform: 'youtube',
    topics: ['Technology', 'Gaming', 'Reviews', 'Innovation'],
    verified: true,
    lastActiveAt: '2024-01-24',
    avgLikes: 240000,
    avgComments: 16500,
    brandMatchScore: 82
  },
  {
    id: '9',
    rank: 9,
    name: 'Isabella Santos',
    handle: '@isabellafood',
    avatar: '/lovable-uploads/a6b20fef-de43-4809-b7fc-a1d7b088160d.png',
    followers: 7400000,
    engagementRate: 3.8,
    country: 'Brazil',
    countryFlag: '🇧🇷',
    platform: 'tiktok',
    topics: ['Cooking', 'Food', 'Recipes', 'Culture'],
    verified: true,
    lastActiveAt: '2024-01-25',
    avgLikes: 210000,
    avgComments: 14200,
    brandMatchScore: 80
  },
  {
    id: '10',
    rank: 10,
    name: 'Oliver Kim',
    handle: '@oliverfashion',
    avatar: '/lovable-uploads/be55e235-0b1c-45c0-b936-f0587eb24b04.png',
    followers: 5800000,
    engagementRate: 4.3,
    country: 'South Korea',
    countryFlag: '🇰🇷',
    platform: 'instagram',
    topics: ['Fashion', 'Menswear', 'Street Style', 'K-Fashion'],
    verified: true,
    lastActiveAt: '2024-01-26',
    avgLikes: 165000,
    avgComments: 11800,
    brandMatchScore: 78
  }
];

const InfluencerPage = () => {
  const [filters, setFilters] = useState<InfluencerFilters>({
    platform: 'all',
    minFollowers: 0,
    maxFollowers: 1000000000,
    minEngagementRate: 0,
    country: 'all',
    topics: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'followers' | 'engagement' | 'score'>('followers');

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getPlatformBadgeColor = (platform: SocialPlatform) => {
    const colors = {
      instagram: 'bg-pink-100 text-pink-700',
      youtube: 'bg-red-100 text-red-700',
      tiktok: 'bg-black text-white',
      x: 'bg-gray-100 text-gray-700',
      meta: 'bg-blue-100 text-blue-700'
    };
    return colors[platform];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">网红合作</h1>
          <p className="text-gray-600">
            发现适合您品牌的优质网红，建立高效的合作推广关系
          </p>
        </div>

        {/* Filter Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              筛选条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Select value={filters.platform} onValueChange={(value) => setFilters(prev => ({ ...prev, platform: value as SocialPlatform | 'all' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="选择平台" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有平台</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="x">X (Twitter)</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.country} onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="选择国家/地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有国家</SelectItem>
                  <SelectItem value="United States">美国</SelectItem>
                  <SelectItem value="Portugal">葡萄牙</SelectItem>
                  <SelectItem value="Argentina">阿根廷</SelectItem>
                  <SelectItem value="China">中国</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'followers' | 'engagement' | 'score')}>
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="followers">粉丝数排序</SelectItem>
                  <SelectItem value="engagement">互动率排序</SelectItem>
                  <SelectItem value="score">品牌匹配度排序</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索网红名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                更新于 2025-01-26
              </p>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                下载报告
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Influencers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      粉丝数 <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead>互动率</TableHead>
                  <TableHead>国家</TableHead>
                  <TableHead>影响力话题</TableHead>
                  <TableHead>获取联系方式</TableHead>
                  <TableHead>检查虚假粉丝</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInfluencers.map((influencer) => (
                  <TableRow key={influencer.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{influencer.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={influencer.avatar} alt={influencer.name} />
                          <AvatarFallback>{influencer.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{influencer.name}</span>
                            {influencer.verified && <Shield className="w-4 h-4 text-blue-500" />}
                          </div>
                          <p className="text-sm text-primary">{influencer.handle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatFollowers(influencer.followers)}
                    </TableCell>
                    <TableCell>{influencer.engagementRate}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{influencer.countryFlag}</span>
                        <span>{influencer.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {influencer.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {influencer.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{influencer.topics.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        获取联系方式
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="text-pink-600 border-pink-200 hover:bg-pink-50">
                        检查虚假粉丝
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerPage;