
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, Globe } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* 统计卡片行 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="待处理信息"
          value={12}
          icon={Mail}
          trend="+2 新消息"
          trendUp={true}
        />
        <StatCard
          title="今日客户"
          value={48}
          icon={Users}
          trend="+12% 较昨日"
          trendUp={true}
        />
        <StatCard
          title="今日发信"
          value={156}
          icon={Send}
          trend="+8% 较昨日"
          trendUp={true}
        />
        <StatCard
          title="官网访问量"
          value="2,341"
          icon={Globe}
          trend="+23% 较昨日"
          trendUp={true}
        />
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧工作流展示 */}
        <div className="lg:col-span-2">
          <AIWorkflow />
        </div>

        {/* 右侧AI业务员信息 */}
        <div className="space-y-6">
          <AIAgentCard />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
