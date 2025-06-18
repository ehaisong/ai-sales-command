
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, MailOpen } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 h-full">
      {/* 主要内容区域 - 改为8:4比例布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* 左列：统计卡片 + AI工作流 - 占8/12宽度 */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* 统计卡片区域 - 单行4列网格 */}
          <div className="grid grid-cols-4 gap-3">
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
              value={321} 
              icon={Users} 
              trend="+12% 较昨日" 
              trendUp={true} 
              iconColor="#FF5724" 
            />
            <StatCard 
              title="今日发信" 
              value={185} 
              icon={Send} 
              trend="+8% 较昨日" 
              trendUp={true} 
              iconColor="#0EA5E9" 
            />
            <StatCard 
              title="今日收信" 
              value={15} 
              icon={MailOpen} 
              trend="+23% 较昨日" 
              trendUp={true} 
              iconColor="#10B981" 
            />
          </div>

          {/* AI工作流区域 */}
          <div className="flex-1">
            <AIWorkflow />
          </div>
        </div>

        {/* 右列：AI业务员信息和聊天框 - 占4/12宽度 */}
        <div className="lg:col-span-4 space-y-6 h-full">
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
