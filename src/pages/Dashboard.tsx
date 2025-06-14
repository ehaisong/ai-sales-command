
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, Globe, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="p-6 h-full">
      {/* 统计卡片区域 - 优化为单行布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="待处理信息"
          value={12}
          icon={Mail}
          trend="+2 新消息"
          trendUp={true}
          iconColor="#4f46e5"
        />
        <StatCard
          title="今日客户"
          value={48}
          icon={Users}
          trend="+12% 较昨日"
          trendUp={true}
          iconColor="#FF5724"
        />
        <StatCard
          title="今日发信"
          value={156}
          icon={Send}
          trend="+8% 较昨日"
          trendUp={true}
          iconColor="#0EA5E9"
        />
        <StatCard
          title="官网访问量"
          value="2,341"
          icon={Globe}
          trend="+23% 较昨日"
          trendUp={true}
          iconColor="#10B981"
        />
      </div>

      {/* 平台绑定区域 */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">外贸助手绑定平台</h3>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Linkedin className="h-4 w-4" style={{ color: '#0A66C2' }} />
            <span>LinkedIn</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Facebook className="h-4 w-4" style={{ color: '#1877F2' }} />
            <span>Meta</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded bg-black flex items-center justify-center">
              <span className="text-white text-xs font-bold">X</span>
            </div>
            <span>X</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Instagram className="h-4 w-4" style={{ color: '#E4405F' }} />
            <span>Instagram</span>
          </Button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* 中间列：AI工作流 */}
        <div className="lg:col-span-2">
          <AIWorkflow />
        </div>

        {/* 右侧列：AI业务员信息和聊天框 */}
        <div className="space-y-6 h-full">
          <AIAgentCard />
          <div className="flex-1">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
