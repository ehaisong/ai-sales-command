
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Mail, Users, Send, Globe, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 h-full">
      {/* 三列网格布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* 左列：统计卡片区域 - 占3/12宽度 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 统计卡片 - 垂直排列 */}
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
          
          {/* 额外统计卡片 */}
          <StatCard 
            title="本周转化率" 
            value="15.8%" 
            icon={TrendingUp} 
            trend="+2.3% 较上周" 
            trendUp={true} 
            iconColor="#8B5CF6" 
          />
          <StatCard 
            title="平均响应时间" 
            value="2.5h" 
            icon={Clock} 
            trend="-0.5h 较昨日" 
            trendUp={true} 
            iconColor="#F59E0B" 
          />
        </div>

        {/* 中列：AI工作流区域 - 占6/12宽度 */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1">
            <AIWorkflow />
          </div>
        </div>

        {/* 右列：AI业务员信息和聊天框 - 占3/12宽度 */}
        <div className="lg:col-span-3 space-y-6 h-full">
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
