
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Smartphone, 
  TrendingUp
} from "lucide-react";
import { LandingPage } from "@/types/seo";

interface LandingPageCardProps {
  page: LandingPage;
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({ page }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'optimizing': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'generating': return '制作中';
      case 'optimizing': return '优化中';
      case 'draft': return '草稿';
      default: return '未知';
    }
  };

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* 页面预览图和基本信息 */}
        <div className="flex gap-3 mb-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <img 
              src={page.previewImage} 
              alt={page.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{page.title}</h3>
            <p className="text-sm text-gray-500 truncate">{page.url}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(page.status)}>
                {getStatusText(page.status)}
              </Badge>
              <span className={`text-sm font-medium ${getSEOScoreColor(page.seoScore)}`}>
                SEO: {page.seoScore}
              </span>
            </div>
          </div>
        </div>

        {/* 关键词标签 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {page.targetKeywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {page.targetKeywords.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{page.targetKeywords.length - 3}
            </Badge>
          )}
        </div>

        {/* 访问量统计 */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-medium text-gray-900">{page.analytics.dailyViews}</div>
            <div className="text-gray-500">日访问</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-medium text-gray-900">{page.analytics.weeklyViews}</div>
            <div className="text-gray-500">周访问</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="font-medium text-gray-900">{page.analytics.monthlyViews}</div>
            <div className="text-gray-500">月访问</div>
          </div>
        </div>

        {/* 技术指标 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {page.loadSpeed}ms
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className={`w-3 h-3 ${page.mobileOptimized ? 'text-green-500' : 'text-red-500'}`} />
            {page.mobileOptimized ? '已适配' : '未适配'}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {page.analytics.bounceRate}% 跳出率
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandingPageCard;
