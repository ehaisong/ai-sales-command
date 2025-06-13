
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workflowSteps = [
  "正在分析LinkedIn平台潜在客户...",
  "发现32个目标客户，正在获取联系方式...",
  "正在生成个性化邮件内容...",
  "已发送邮件给5位客户，等待回复...",
  "正在更新Instagram品牌内容...",
  "分析竞品定价策略变化...",
  "正在搜索行业关键词趋势...",
  "生成本周营销报告...",
];

const AIWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = workflowSteps[currentStep % workflowSteps.length];
      setVisibleSteps(prev => [step, ...prev.slice(0, 4)]);
      setCurrentStep(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI业务员工作流</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleSteps.map((step, index) => (
          <div
            key={`${step}-${index}`}
            className={`p-3 bg-secondary/50 rounded-lg fade-in transition-opacity duration-500 ${
              index === 0 ? 'opacity-100' : 'opacity-70'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">{step}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
