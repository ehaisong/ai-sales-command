
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Settings, User as Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAgentCard = () => {
  const socialPlatforms = ['LinkedIn', 'Meta', 'X', 'Instagram'];

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg">AI业务员</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI头像和信息 */}
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">小思</h3>
            <p className="text-sm text-muted-foreground">专业外贸营销助手</p>
          </div>
        </div>

        {/* 个人简介 */}
        <p className="text-sm text-muted-foreground">
          我是您的专属AI业务员，精通多平台营销，擅长客户开发和品牌推广，24小时为您的业务增长努力工作。
        </p>

        {/* 绑定的社交媒体 */}
        <div>
          <p className="text-sm font-medium mb-2">已绑定平台</p>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-2 pt-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link to="/ai-agent/settings">
              <Settings className="mr-2 h-4 w-4" />
              设置
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link to="/ai-agent/knowledge">
              <Brain className="mr-2 h-4 w-4" />
              知识大脑
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;
