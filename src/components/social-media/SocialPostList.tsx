
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Linkedin, Instagram, Twitter, MoreHorizontal, Trash2, Edit, Calendar, Heart, MessageCircle, Share, Eye } from "lucide-react";
import { mockSocialPosts } from "./mockSocialData";
import { SocialPost, SocialPlatform } from "@/types/socialMedia";

const platformIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

const statusColors = {
  published: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
  draft: "bg-gray-100 text-gray-800",
  failed: "bg-red-100 text-red-800",
};

const statusLabels = {
  published: "已发布",
  scheduled: "待发布",
  draft: "草稿",
  failed: "发布失败",
};

interface SocialPostListProps {
  platform: string;
}

const SocialPostList: React.FC<SocialPostListProps> = ({ platform }) => {
  const [posts, setPosts] = useState<SocialPost[]>(mockSocialPosts);

  const filteredPosts = platform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === platform);

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    console.log(`Deleted post ${postId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无发文记录</h3>
        <p className="text-gray-500">开始创作您的第一条社交媒体内容吧</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => {
        const Icon = platformIcons[post.platform];
        return (
          <div key={post.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-primary/10 rounded">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${statusColors[post.status]}`}
                  >
                    {statusLabels[post.status]}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">
                    {post.status === 'published' && post.publishedAt && (
                      <>发布于 {formatDate(post.publishedAt)}</>
                    )}
                    {post.status === 'scheduled' && post.scheduledAt && (
                      <>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {formatDate(post.scheduledAt)}
                      </>
                    )}
                    {post.status === 'draft' && (
                      <>创建于 {formatDate(post.createdAt)}</>
                    )}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    编辑
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mb-3">
              <p className="text-gray-900 leading-relaxed">{post.content}</p>
              {post.imageUrls && post.imageUrls.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {post.imageUrls.slice(0, 3).map((url, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-100 rounded border">
                      <img src={url} alt="" className="w-full h-full object-cover rounded" />
                    </div>
                  ))}
                  {post.imageUrls.length > 3 && (
                    <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600">
                      +{post.imageUrls.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>

            {post.hashtags.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.status === 'published' && (
              <div className="flex items-center space-x-4 text-sm text-gray-500 pt-3 border-t">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{formatNumber(post.engagement.likes)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{formatNumber(post.engagement.comments)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share className="w-4 h-4" />
                  <span>{formatNumber(post.engagement.shares)}</span>
                </div>
                {post.engagement.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(post.engagement.views)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SocialPostList;
