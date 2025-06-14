
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, ClipboardEdit } from "lucide-react";
import { Customer } from "@/types/customer";

interface CustomerInsightsPanelProps {
  customer: Customer;
}

const CustomerInsightsPanel: React.FC<CustomerInsightsPanelProps> = ({ customer }) => {
  // 模拟AI生成洞察
  const insights = [
    {
      icon: <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />,
      title: "行为偏好",
      value:
        customer.tags.includes("价格敏感") || customer.tags.includes("性价比")
          ? "倾向性价比、经常关注促销"
          : "偏好高品质、重视服务体验",
    },
    {
      icon: <Target className="h-5 w-5 text-purple-500 mr-2" />,
      title: "可能需求",
      value:
        customer.dataSource === "LinkedIn"
          ? "提升品牌曝光、扩展业务人脉"
          : "关注数字化采购、高效沟通工具",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-500 mr-2" />,
      title: "近期动态",
      value:
        customer.customerScore > 80
          ? "近期有多次活跃互动，是成交潜力客户"
          : "互动频率一般，建议主动激活",
    },
    {
      icon: <ClipboardEdit className="h-5 w-5 text-blue-500 mr-2" />,
      title: "下一步建议",
      value:
        customer.customerScore > 80
          ? "针对客户关注点推送定制方案，争取快速推进合作。"
          : "可安排专属顾问1对1沟通，挖掘深层需求。",
    },
  ];

  return (
    <Card className="mt-3">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-base flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
          AI驱动的客户洞察
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3 pt-1">
        {insights.map((item, idx) => (
          <div key={idx} className="flex items-start text-sm">
            {item.icon}
            <div>
              <span className="font-medium mr-1">{item.title}：</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CustomerInsightsPanel;

