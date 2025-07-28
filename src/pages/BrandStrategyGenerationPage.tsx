import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BrandStrategyGenerationPage = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Linkedin', 'Facebook', 'X']);
  const [generationComplete, setGenerationComplete] = useState(false);

  // 模拟品牌数据 - 在实际应用中这些数据会从前一页传递过来
  const brandData = {
    name: '思拓出海',
    website: 'https://situo-overseas.com',
    icon: '/lovable-uploads/be55e235-0b1c-45c0-b936-f0587eb24b04.png'
  };

  const availablePlatforms = [
    'Linkedin', 'Facebook', 'X', '上传文件'
  ];

  useEffect(() => {
    // 模拟生成过程
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link 
          to="/brand-management" 
          className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回工作台
        </Link>

        {/* 品牌信息显示 */}
        <div className="flex items-center mb-8">
          <div className="flex items-center bg-primary/10 rounded-lg px-4 py-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm mr-3">
              <img alt="思拓出海" className="h-8 w-auto object-contain" src={brandData.icon} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{brandData.name}</h2>
              <p className="text-sm text-muted-foreground">{brandData.website}</p>
            </div>
          </div>
        </div>

        {/* 主要内容卡片 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              {/* 图标 */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {isGenerating ? (
                    <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                  ) : (
                    <Check className="h-8 w-8 text-primary" />
                  )}
                </div>
              </div>

              {/* 标题和描述 */}
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-foreground">
                  {isGenerating ? '生成内容策略' : '品牌知识库创建完成'}
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  {isGenerating 
                    ? `为 ${brandData.name} 创建AI驱动的内容角度，指导您的内容创作`
                    : "已成功创建品牌知识库并定期更新，AI将根据知识库为你生成内容或制定营销策略！"
                  }
                </p>
              </div>

              {/* 平台选择 */}
              {!isGenerating && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">更多品牌信息导入</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {availablePlatforms.map((platform) => (
                      <Badge
                        key={platform}
                        variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm transition-colors"
                        onClick={() => togglePlatform(platform)}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 生成状态 */}
              {isGenerating && (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  <span className="ml-3 text-sm text-muted-foreground">正在生成策略...</span>
                </div>
              )}

              {/* 完成按钮 */}
              {generationComplete && (
                <div className="pt-6">
                  <Button 
                    onClick={handleComplete}
                    className="px-8 h-12 text-base"
                  >
                    完成设置
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandStrategyGenerationPage;