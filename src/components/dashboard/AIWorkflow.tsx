
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const workflowSteps = [
  { text: "正在分析LinkedIn平台潜在客户...", type: "linkedin", color: "#0A66C2", bgColor: "#EBF4FF" },
  { text: "发现32个目标客户，正在获取联系方式...", type: "customer", color: "#10B981", bgColor: "#ECFDF5" },
  { text: "正在生成个性化邮件内容...", type: "email", color: "#34D399", bgColor: "#ECFDF5" },
  { text: "已发送邮件给5位客户，等待回复...", type: "email", color: "#34D399", bgColor: "#ECFDF5" },
  { text: "正在更新Instagram品牌内容...", type: "instagram", color: "#E4405F", bgColor: "#FDF2F8" },
  { text: "分析竞品定价策略变化...", type: "analysis", color: "#F59E0B", bgColor: "#FFFBEB" },
  { text: "正在搜索行业关键词趋势...", type: "trends", color: "#8B5CF6", bgColor: "#F3F4F6" },
  { text: "生成本周营销报告...", type: "report", color: "#6366F1", bgColor: "#EEF2FF" },
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
    <Card className="h-full flex flex-col">
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
              className={`p-4 rounded-lg fade-in transition-opacity duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-70'
              }`}
              style={{ backgroundColor: step.bgColor }}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: step.color }}
                ></div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: step.color }}
                >
                  {step.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
