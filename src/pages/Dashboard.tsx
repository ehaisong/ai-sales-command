
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, Globe } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 h-full">
      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* 中间列：统计卡片和工作流 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 统计卡片集中显示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* AI工作流展示 */}
          <div className="flex-1">
            <AIWorkflow />
          </div>
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
