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
    name: 'Cristiano Ronaldo',
    handle: '@cristiano',
    avatar: '/lovable-uploads/515beaa6-06a7-4d91-85dd-09233ccbf7d0.png',
    followers: 661400000,
    engagementRate: 1.08,
    country: 'Portugal',
    countryFlag: '🇵🇹',
    platform: 'instagram',
    topics: ['Sports', 'Finance', 'Soccer'],
    verified: true,
    lastActiveAt: '2024-01-20',
    avgLikes: 5500000,
    avgComments: 85000,
    brandMatchScore: 95
  },
  {
    id: '2',
    rank: 2,
    name: 'Leo Messi',
    handle: '@leomessi',
    avatar: '/lovable-uploads/863076f0-5e79-4bb1-a8e5-587a8c9ce88c.png',
    followers: 506500000,
    engagementRate: 0.76,
    country: 'Argentina',
    countryFlag: '🇦🇷',
    platform: 'instagram',
    topics: ['Sports', 'Soccer', 'Activity General', 'General Interest'],
    verified: true,
    lastActiveAt: '2024-01-19',
    avgLikes: 4200000,
    avgComments: 62000,
    brandMatchScore: 92
  },
  {
    id: '3',
    rank: 3,
    name: 'Selena Gomez',
    handle: '@selenagomez',
    avatar: '/lovable-uploads/a6b20fef-de43-4809-b7fc-a1d7b088160d.png',
    followers: 418500000,
    engagementRate: 0.55,
    country: 'United States',
    countryFlag: '🇺🇸',
    platform: 'instagram',
    topics: ['Beauty and Self Care', 'Entertainment and Pop Culture', 'Music', 'Actors'],
    verified: true,
    lastActiveAt: '2024-01-18',
    avgLikes: 3800000,
    avgComments: 45000,
    brandMatchScore: 88
  },
  {
    id: '4',
    rank: 4,
    name: 'Kylie Jenner',
    handle: '@kyliejenner',
    avatar: '/lovable-uploads/be55e235-0b1c-45c0-b936-f0587eb24b04.png',
    followers: 393100000,
    engagementRate: 0.41,
    country: 'United States',
    countryFlag: '🇺🇸',
    platform: 'instagram',
    topics: ['Beauty and Self Care', 'Product Showcase', 'Modeling', 'Public Figure'],
    verified: true,
    lastActiveAt: '2024-01-17',
    avgLikes: 3500000,
    avgComments: 38000,
    brandMatchScore: 85
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