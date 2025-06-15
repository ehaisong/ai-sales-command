
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Linkedin, Instagram, Twitter, MoreHorizontal, Trash2, Edit, Calendar, Heart, MessageCircle, Share, Eye } from "lucide-react";
import { mockSocialPosts } from "./mockSocialData";
import { SocialPost, SocialPlatform } from "@/types/socialMedia";

const platformIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

const platformColors = {
  linkedin: "text-[#0A66C2]",
  instagram: "text-[#E4405F]",
  twitter: "text-black",
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
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPosts = platform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === platform);

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    console.log(`Deleted post ${postId}`);
  };

  const handlePostClick = (post: SocialPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
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
    <>
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const Icon = platformIcons[post.platform];
          const color = platformColors[post.platform as keyof typeof platformColors];
          return (
            <div key={post.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-primary/10 rounded">
                    <Icon className={`w-4 h-4 ${color}`} />
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

              <div className="mb-3 cursor-pointer" onClick={() => handlePostClick(post)}>
                <p className="text-gray-900 leading-relaxed hover:text-primary transition-colors">
                  {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                </p>
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
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-auto rounded bg-blue-50 px-2 py-1 text-xs font-normal text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation(); // 防止触发父级的handlePostClick
                          console.log(`Filtering by tag: ${tag}`);
                        }}
                      >
                        {tag}
                      </Button>
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

      {/* Post Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {selectedPost && (
                <>
                  <div className="p-1.5 bg-primary/10 rounded">
                    {React.createElement(platformIcons[selectedPost.platform], { 
                      className: `w-4 h-4 ${platformColors[selectedPost.platform as keyof typeof platformColors]}` 
                    })}
                  </div>
                  <span>帖子详情</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${selectedPost ? statusColors[selectedPost.status] : ''}`}
                  >
                    {selectedPost ? statusLabels[selectedPost.status] : ''}
                  </Badge>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              {/* 发布时间信息 */}
              <div className="text-sm text-gray-500">
                {selectedPost.status === 'published' && selectedPost.publishedAt && (
                  <>发布于 {formatDate(selectedPost.publishedAt)}</>
                )}
                {selectedPost.status === 'scheduled' && selectedPost.scheduledAt && (
                  <>
                    <Calendar className="w-3 h-3 inline mr-1" />
                    计划发布时间: {formatDate(selectedPost.scheduledAt)}
                  </>
                )}
                {selectedPost.status === 'draft' && (
                  <>创建于 {formatDate(selectedPost.createdAt)}</>
                )}
              </div>

              {/* 帖子内容 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
                
                {/* 图片展示 */}
                {selectedPost.imageUrls && selectedPost.imageUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {selectedPost.imageUrls.map((url, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded border">
                        <img src={url} alt="" className="w-full h-full object-cover rounded" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 标签 */}
              {selectedPost.hashtags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">标签</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.hashtags.map((tag, index) => (
                       <Button
                        key={index}
                        variant="ghost"
                        className="h-auto rounded-full bg-blue-50 px-3 py-1 text-sm font-normal text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => console.log(`Filtering by tag: ${tag}`)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 互动数据 */}
              {selectedPost.status === 'published' && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">互动数据</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <Heart className="w-5 h-5 mx-auto mb-1 text-red-500" />
                      <div className="text-lg font-semibold">{formatNumber(selectedPost.engagement.likes)}</div>
                      <div className="text-xs text-gray-500">点赞</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <MessageCircle className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                      <div className="text-lg font-semibold">{formatNumber(selectedPost.engagement.comments)}</div>
                      <div className="text-xs text-gray-500">评论</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <Share className="w-5 h-5 mx-auto mb-1 text-green-500" />
                      <div className="text-lg font-semibold">{formatNumber(selectedPost.engagement.shares)}</div>
                      <div className="text-xs text-gray-500">分享</div>
                    </div>
                    {selectedPost.engagement.views && (
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <Eye className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                        <div className="text-lg font-semibold">{formatNumber(selectedPost.engagement.views)}</div>
                        <div className="text-xs text-gray-500">浏览</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialPostList;
