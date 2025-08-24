
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
        <div className="flex items-center justify-between">
          <h1 className="page-title">工作台</h1>
          <p className="page-subtitle">管理您的营销活动和客户关系</p>
        </div>
        
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
        {/* 左列：AI工作流 - 占8/12宽度 */}
        <div className="lg:col-span-8 flex flex-col">
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
