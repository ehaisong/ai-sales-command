
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workflowSteps = [
  { text: "正在分析LinkedIn平台潜在客户...", color: "#0A66C2", category: "linkedin" },
  { text: "发现32个目标客户，正在获取联系方式...", color: "#10B981", category: "data" },
  { text: "正在生成个性化邮件内容...", color: "#10B981", category: "email" },
  { text: "已发送邮件给5位客户，等待回复...", color: "#10B981", category: "email" },
  { text: "正在更新Instagram品牌内容...", color: "#E4405F", category: "instagram" },
  { text: "分析竞品定价策略变化...", color: "#F59E0B", category: "competitor" },
  { text: "正在搜索行业关键词趋势...", color: "#06B6D4", category: "seo" },
  { text: "生成本周营销报告...", color: "#8B5CF6", category: "analytics" },
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
              className={`p-4 bg-gray-50 rounded-lg fade-in transition-opacity duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-70'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: step.color }}
                ></div>
                <span className="text-sm">{step.text}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
