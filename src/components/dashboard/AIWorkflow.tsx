
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Linkedin, Mail, Instagram, CheckCircle2, Loader2 } from 'lucide-react';

interface WorkflowSubstep {
  text: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: Date;
}

interface WorkflowStep {
  id: string;
  text: string;
  color: string;
  category: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  timestamp: Date;
  status: 'completed' | 'in-progress' | 'pending';
  substeps: WorkflowSubstep[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: '1',
    text: "正在分析LinkedIn平台潜在客户...",
    color: "#0A66C2",
    category: "linkedin",
    icon: Linkedin,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    status: 'in-progress',
    substeps: [
      { text: "扫描目标行业关键词", status: 'completed', timestamp: new Date(Date.now() - 280000) },
      { text: "分析用户活跃度", status: 'completed', timestamp: new Date(Date.now() - 240000) },
      { text: "提取联系信息", status: 'in-progress' },
      { text: "生成客户画像", status: 'pending' }
    ]
  },
  {
    id: '2',
    text: "发现32个目标客户，正在获取联系方式...",
    color: "#10B981",
    category: "data",
    icon: CheckCircle2,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    status: 'completed',
    substeps: [
      { text: "匹配目标客户标准", status: 'completed', timestamp: new Date(Date.now() - 170000) },
      { text: "验证邮箱有效性", status: 'completed', timestamp: new Date(Date.now() - 150000) },
      { text: "获取社交媒体链接", status: 'completed', timestamp: new Date(Date.now() - 120000) }
    ]
  },
  {
    id: '3',
    text: "正在生成个性化邮件内容...",
    color: "#10B981",
    category: "email",
    icon: Mail,
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    status: 'in-progress',
    substeps: [
      { text: "分析客户兴趣点", status: 'completed', timestamp: new Date(Date.now() - 110000) },
      { text: "生成邮件主题", status: 'completed', timestamp: new Date(Date.now() - 90000) },
      { text: "撰写邮件正文", status: 'in-progress' },
      { text: "添加个性化签名", status: 'pending' }
    ]
  },
  {
    id: '4',
    text: "已发送邮件给5位客户，等待回复...",
    color: "#10B981",
    category: "email",
    icon: Mail,
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
    status: 'completed',
    substeps: [
      { text: "邮件发送确认", status: 'completed', timestamp: new Date(Date.now() - 55000) },
      { text: "设置跟进提醒", status: 'completed', timestamp: new Date(Date.now() - 45000) },
      { text: "监控邮件打开率", status: 'completed', timestamp: new Date(Date.now() - 35000) }
    ]
  },
  {
    id: '5',
    text: "正在更新Instagram品牌内容...",
    color: "#E4405F",
    category: "instagram",
    icon: Instagram,
    timestamp: new Date(Date.now() - 30000), // 30 seconds ago
    status: 'in-progress',
    substeps: [
      { text: "分析热门话题", status: 'completed', timestamp: new Date(Date.now() - 25000) },
      { text: "生成内容创意", status: 'in-progress' },
      { text: "设计视觉元素", status: 'pending' },
      { text: "安排发布时间", status: 'pending' }
    ]
  }
];

const AIWorkflow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<WorkflowStep[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = workflowSteps[currentStepIndex % workflowSteps.length];
      setVisibleSteps(prev => {
        const newSteps = [step, ...prev.slice(0, 4)];
        return newSteps;
      });
      setCurrentStepIndex(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentStepIndex]);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return `${seconds}秒前`;
    }
  };

  const getStatusIcon = (status: 'completed' | 'in-progress' | 'pending') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="h-3 w-3 text-blue-500 animate-spin" />;
      case 'pending':
        return <div className="h-3 w-3 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI业务员工作流</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <Accordion type="single" collapsible className="space-y-3">
          {visibleSteps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <AccordionItem 
                key={`${step.id}-${index}`} 
                value={`${step.id}-${index}`}
                className={`transition-all duration-500 border-none ${
                  index === 0 ? 'opacity-100' : 'opacity-80'
                }`}
              >
                <AccordionTrigger className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover:no-underline">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: step.color }}
                      />
                      <Icon className="h-4 w-4 flex-shrink-0" color={step.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium truncate">{step.text}</span>
                        {step.status === 'in-progress' && (
                          <Loader2 className="h-3 w-3 text-blue-500 animate-spin flex-shrink-0" />
                        )}
                        {step.status === 'completed' && (
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{formatTime(step.timestamp)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {step.substeps.filter(s => s.status === 'completed').length}/{step.substeps.length}
                    </span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent>
                  <div className="mt-2 ml-6 space-y-2">
                    {step.substeps.map((substep, substepIndex) => (
                      <div key={substepIndex} className="flex items-center space-x-3 p-2 bg-white rounded border-l-2 border-gray-200">
                        {getStatusIcon(substep.status)}
                        <div className="flex-1">
                          <span className={`text-sm ${substep.status === 'completed' ? 'text-gray-600' : 'text-gray-800'}`}>
                            {substep.text}
                          </span>
                          {substep.timestamp && (
                            <div className="flex items-center space-x-1 mt-1">
                              <Clock className="h-2.5 w-2.5 text-gray-400" />
                              <span className="text-xs text-gray-400">{formatTime(substep.timestamp)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
