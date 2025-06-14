
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, User, MessageSquare, Phone, Mail, Calendar, TrendingUp, Send } from 'lucide-react';
import { Customer } from '@/types/customer';

interface CustomerAIAssistantProps {
  customer: Customer | null;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const CustomerAIAssistant: React.FC<CustomerAIAssistantProps> = ({ customer }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim() || !customer) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 模拟AI业务员回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `关于客户${customer.name}的信息：基于${customer.customerScore}分的评分，这是一个${customer.customerScore >= 80 ? '高价值' : customer.customerScore >= 60 ? '中等价值' : '低价值'}客户。建议重点关注其在${customer.dataSource}平台的活跃度，并根据其${customer.tags.join('、')}等标签制定针对性的沟通策略。`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (!customer) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>AI 业务员</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            点击左侧客户列表中的客户，开始与AI业务员对话
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
            <span>客户信息</span>
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

      {/* AI业务员对话框 */}
      <Card className="h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>AI 业务员</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-3">
          {/* 对话历史 */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center py-4 text-muted-foreground text-sm">
                向AI业务员咨询关于 {customer.name} 的信息
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 输入框 */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`询问关于${customer.name}的信息...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAIAssistant;
