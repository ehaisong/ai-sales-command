
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Settings, User as Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAgentCard = () => {
  const socialPlatforms = ['LinkedIn', 'Meta', 'X', 'Instagram'];

  return (
    <Card className="card-hover">
      <CardContent className="p-4 space-y-3">
        {/* AI头像和信息 */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">小思</h3>
            <p className="text-xs text-muted-foreground">专业外贸营销助手</p>
          </div>
        </div>

        {/* 个人简介 */}
        <p className="text-xs text-muted-foreground">
          我是您的专属AI业务员，精通多平台营销，擅长客户开发和品牌推广。
        </p>

        {/* 绑定的社交媒体 */}
        <div>
          <p className="text-xs font-medium mb-1">已绑定平台</p>
          <div className="flex flex-wrap gap-1">
            {socialPlatforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs px-1 py-0">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-2">
          <Button asChild size="sm" variant="outline" className="flex-1 text-xs h-8">
            <Link to="/ai-agent/settings">
              <Settings className="mr-1 h-3 w-3" />
              设置
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 text-xs h-8">
            <Link to="/ai-agent/knowledge">
              <Brain className="mr-1 h-3 w-3" />
              知识大脑
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;
