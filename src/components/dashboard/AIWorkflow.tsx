
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workflowSteps = [
  {
    text: "正在分析LinkedIn平台潜在客户...",
    category: "客户获取",
    color: "bg-blue-100 border-blue-200 text-blue-800"
  },
  {
    text: "发现32个目标客户，正在获取联系方式...",
    category: "客户获取", 
    color: "bg-blue-100 border-blue-200 text-blue-800"
  },
  {
    text: "正在生成个性化邮件内容...",
    category: "邮件营销",
    color: "bg-green-100 border-green-200 text-green-800"
  },
  {
    text: "已发送邮件给5位客户，等待回复...",
    category: "邮件营销",
    color: "bg-green-100 border-green-200 text-green-800"
  },
  {
    text: "正在更新Instagram品牌内容...",
    category: "内容管理",
    color: "bg-purple-100 border-purple-200 text-purple-800"
  },
  {
    text: "分析竞品定价策略变化...",
    category: "数据分析",
    color: "bg-orange-100 border-orange-200 text-orange-800"
  },
  {
    text: "正在搜索行业关键词趋势...",
    category: "数据分析",
    color: "bg-orange-100 border-orange-200 text-orange-800"
  },
  {
    text: "生成本周营销报告...",
    category: "数据分析",
    color: "bg-orange-100 border-orange-200 text-orange-800"
  },
];

const AIWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<typeof workflowSteps>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = workflowSteps[currentStep % workflowSteps.length];
      setVisibleSteps(prev => [step, ...prev.slice(0, 4)]);
      setCurrentStep(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <Card className="h-full flex flex-col bg-white">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI业务员工作流</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-3">
          {visibleSteps.map((step, index) => (
            <div
              key={`${step.text}-${index}`}
              className={`p-4 rounded-lg border transition-opacity duration-500 ${
                step.color
              } ${index === 0 ? 'opacity-100' : 'opacity-70'}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-current rounded-full flex-shrink-0 mt-2"></div>
                <div className="flex-1">
                  <div className="text-xs font-medium mb-1">{step.category}</div>
                  <span className="text-sm">{step.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
