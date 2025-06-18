
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, User as Brain, Linkedin, Facebook, X, Instagram, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIAgentCard = () => {
  const socialPlatforms = [
    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
    { name: 'Meta', icon: Facebook, color: '#1877F2' },
    { name: 'X', icon: X, color: '#000000' },
    { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  ];

  return (
    <Card className="monday-card hover:shadow-monday transition-all duration-300 border-l-4 border-l-primary">
      <CardContent className="p-4 space-y-4">
        {/* AI头像和基本信息 */}
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 bg-gradient-to-br from-monday-blue to-monday-purple rounded-full flex items-center justify-center shadow-monday/30 shadow-md">
            <User className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <Activity className="h-2 w-2 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-monday-gray-900 text-lg">小思</h3>
            <p className="text-xs text-monday-gray-600">专业外贸营销助手</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">在线工作中</span>
            </div>
          </div>
        </div>

        {/* 工作状态简介 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
          <p className="text-xs text-monday-gray-700 leading-relaxed">
            正在为您处理32个潜在客户，已发送5封个性化邮件，Instagram内容更新中...
          </p>
        </div>

        {/* 绑定的社交媒体平台 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-monday-gray-700">已绑定平台</p>
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">4个平台</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <div 
                  key={platform.name} 
                  className="p-2 bg-white rounded-lg shadow-sm border border-monday-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center"
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
          <Button asChild size="sm" variant="outline" className="flex-1 text-xs h-8 border-monday-gray-300 hover:border-monday-blue/50">
            <Link to="/ai-agent/settings">
              <Settings className="mr-1 h-3 w-3" />
              设置
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 text-xs h-8 bg-monday-blue hover:bg-monday-blue-dark shadow-monday/40">
            <Link to="/ai-agent/knowledge">
              <Brain className="mr-1 h-3 w-3" />
              知识库
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;
