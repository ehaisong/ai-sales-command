
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, MessageSquareText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* 统计卡片行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="待处理信息"
          value={12}
          icon={Mail}
          trend=""
          trendUp={true}
        />
        <StatCard
          title="今日客户"
          value={321}
          icon={Users}
          trend=""
          trendUp={true}
        />
        <StatCard
          title="今日发信"
          value={185}
          icon={Send}
          trend=""
          trendUp={true}
        />
        <StatCard
          title="今日收信"
          value={15}
          icon={MessageSquareText}
          trend=""
          trendUp={true}
        />
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧AI工作流 - 占3列 */}
        <div className="lg:col-span-3">
          <AIWorkflow />
        </div>

        {/* 右侧AI业务员信息和对话 - 占1列 */}
        <div className="space-y-6">
          <AIAgentCard />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
