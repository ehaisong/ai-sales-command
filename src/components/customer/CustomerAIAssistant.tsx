
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, User, MessageSquare, Phone, Mail, Calendar, TrendingUp } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerAIAssistantProps {
  customer: Customer | null;
}

const CustomerAIAssistant: React.FC<CustomerAIAssistantProps> = ({ customer }) => {
  if (!customer) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>AI 客户助手</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            点击左侧客户列表中的客户查看详细信息
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreInsight = (score: number) => {
    if (score >= 80) return { text: '高价值客户', color: 'text-green-600' };
    if (score >= 60) return { text: '中等价值客户', color: 'text-yellow-600' };
    return { text: '低价值客户', color: 'text-red-600' };
  };

  const insight = getScoreInsight(customer.customerScore);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>AI 客户助手</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 客户基础信息 */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {customer.type === 'company' ? (
                  <Building2 className="h-6 w-6" />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              {customer.company && (
                <p className="text-sm text-muted-foreground">{customer.company}</p>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{customer.customerScore}</span>
                </div>
                <span className={`text-sm ${insight.color}`}>{insight.text}</span>
              </div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {customer.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 联系信息 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            {customer.phone && (
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
            )}
            {customer.lastContact && (
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>最后联系: {customer.lastContact}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI 分析洞察 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">AI 分析洞察</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">客户价值分析</h4>
            <p className="text-sm text-muted-foreground">
              基于{customer.customerScore}分的客户评分，该客户属于{insight.text}。
              建议重点关注其需求变化，及时跟进商机。
            </p>
          </div>

          {customer.conversationHistory && customer.conversationHistory.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">最近交流总结</h4>
              <p className="text-sm text-muted-foreground">
                {customer.conversationHistory[0].summary}
              </p>
            </div>
          )}

          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">下一步建议</h4>
            <p className="text-sm text-muted-foreground">
              建议在3天内主动联系客户，了解最新需求并提供针对性解决方案。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 快捷操作 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">快捷操作</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            发送邮件
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            安排会议
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            查看对话历史
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAIAssistant;
