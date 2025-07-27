
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import AIWorkflow from '@/components/dashboard/AIWorkflow';
import AIAgentCard from '@/components/dashboard/AIAgentCard';
import ChatBox from '@/components/dashboard/ChatBox';
import { Button } from '@/components/ui/button';
import { Mail, Users, Send, MailOpen, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">工作台</h1>
        <p className="page-subtitle">管理您的营销活动和客户关系</p>
        
        {/* Enterprise CRM Access Button */}
        <div className="mt-4">
          <Button asChild className="monday-button bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Link to="/enterprise-crm">
              <Rocket className="h-4 w-4 mr-2" />
              L3级AI自动化营销系统
            </Link>
          </Button>
        </div>
      </div>

      {/* 主要内容区域 - 改为8:4比例布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* 左列：统计卡片 + AI工作流 - 占8/12宽度 */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* 统计卡片区域 - 单行4列网格 */}
          <div className="grid-stats">
            <StatCard 
              title="待处理信息" 
              value={12} 
              icon={Mail} 
              trend="+2 新消息" 
              trendUp={true} 
              iconColor="hsl(var(--primary))" 
              bgColor="monday-card-small bg-card hover:shadow-monday"
            />
            <StatCard 
              title="今日客户" 
              value={321} 
              icon={Users} 
              trend="+12% 较昨日" 
              trendUp={true} 
              iconColor="hsl(var(--warning))" 
              bgColor="monday-card-small bg-card hover:shadow-monday"
            />
            <StatCard 
              title="今日发信" 
              value={185} 
              icon={Send} 
              trend="+8% 较昨日" 
              trendUp={true} 
              iconColor="hsl(var(--accent))" 
              bgColor="monday-card-small bg-card hover:shadow-monday"
            />
            <StatCard 
              title="今日收信" 
              value={15} 
              icon={MailOpen} 
              trend="+23% 较昨日" 
              trendUp={true} 
              iconColor="hsl(var(--success))" 
              bgColor="monday-card-small bg-card hover:shadow-monday"
            />
          </div>

          {/* AI工作流区域 */}
          <div className="flex-1">
            <AIWorkflow />
          </div>
        </div>

        {/* 右列：AI助手信息和聊天框 - 占4/12宽度 */}
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
