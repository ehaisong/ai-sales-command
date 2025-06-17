
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, User as Brain, Linkedin, Facebook, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAgentCard = () => {
  const socialPlatforms = [
    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { name: 'Meta', icon: Facebook, color: '#1877F2' },
    { name: 'X', icon: X, color: '#000000' },
    { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  ];

  return (
    <Card className="monday-card hover:shadow-monday transition-all duration-300">
      <CardContent className="p-4 space-y-3">
        {/* AI头像和信息 */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-monday-orange to-monday-orange-light rounded-full flex items-center justify-center shadow-monday/30 shadow-md">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-monday-gray-900">小思</h3>
            <p className="text-xs text-monday-gray-600">专业外贸营销助手</p>
          </div>
        </div>

        {/* 个人简介 */}
        <p className="text-xs text-monday-gray-600 leading-relaxed bg-monday-gray-50 p-2 rounded-md">
          我是您的专属AI业务员，精通多平台营销，擅长客户开发和品牌推广。
        </p>

        {/* 绑定的社交媒体 - 只显示图标，单行排列 */}
        <div>
          <p className="text-xs font-medium mb-2 text-monday-gray-700">已绑定平台</p>
          <div className="flex space-x-2">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div 
                  key={platform.name} 
                  className="p-2 bg-white rounded-lg shadow-sm border border-monday-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <IconComponent 
                    className="h-4 w-4" 
                    style={{ color: platform.color }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-2 pt-2">
          <Button asChild size="sm" variant="outline" className="flex-1 text-xs h-8 border-monday-gray-300 hover:border-monday-orange/50">
            <Link to="/ai-agent/settings">
              <Settings className="mr-1 h-3 w-3" />
              设置
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 text-xs h-8 bg-monday-orange hover:bg-monday-orange-dark shadow-monday/40">
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
