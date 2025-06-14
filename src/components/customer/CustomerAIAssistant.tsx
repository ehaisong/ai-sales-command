import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, User, MessageSquare, Phone, Mail, Calendar, TrendingUp, Send, Book } from 'lucide-react';
import { Customer } from '@/types/customer';
import CustomerInsightsPanel from "./CustomerInsightsPanel";
import CustomerKnowledgeDialog from "./CustomerKnowledgeDialog";

// 导入Dialog相关组件
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CustomerConversationHistoryDialog from "./CustomerConversationHistoryDialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [knowledgeDialogOpen, setKnowledgeDialogOpen] = useState(false);
  const [knowledgeEntries, setKnowledgeEntries] = useState<string[]>([]);

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
    <div className="space-y-3">
      {/* 客户信息精简卡片 */}
      <Card className="!p-0">
        <CardHeader className="p-3 pb-2">
          {/* 顶部标题：头像+客户名称 */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {customer.type === 'company' ? (
                  <Building2 className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base leading-tight">{customer.name}</h3>
              {customer.company && (
                <div className="text-xs text-muted-foreground">{customer.company}</div>
              )}
            </div>
            {/* 交流历史按钮 */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-4 h-8 px-3 py-1 text-xs">
                  交流历史
                </Button>
              </DialogTrigger>
              {dialogOpen && (
                <CustomerConversationHistoryDialog customer={customer} />
              )}
            </Dialog>
            {/* 新增：知识库按钮 */}
            <Dialog open={knowledgeDialogOpen} onOpenChange={setKnowledgeDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 h-8 px-3 py-1 text-xs flex items-center gap-1"
                  title="客户知识库"
                >
                  <Book className="h-4 w-4" />
                  知识库
                </Button>
              </DialogTrigger>
              {/* 弹窗内容 */}
              {knowledgeDialogOpen && (
                <CustomerKnowledgeDialog
                  open={knowledgeDialogOpen}
                  onOpenChange={setKnowledgeDialogOpen}
                  knowledgeList={knowledgeEntries}
                  onAddKnowledge={(entry) => setKnowledgeEntries(prev => [entry, ...prev])}
                  customerName={customer.name}
                />
              )}
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-3 pt-0">
          {/* 客户分数与标签等信息 */}
          <div className="flex items-center space-x-2 mt-0">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{customer.customerScore}</span>
            </div>
            <span className={`text-xs ${insight.color}`}>{insight.text}</span>
          </div>
          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {customer.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
          {/* 联系方式与最后联系时间已移除 */}
        </CardContent>
      </Card>

      {/* AI客户洞察面板 */}
      <CustomerInsightsPanel customer={customer} />

      {/* AI业务员对话框 */}
      <Card className="h-[360px] flex flex-col mt-3">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>AI 业务员</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-2 p-4 pt-0">
          {/* 对话历史 */}
          <div className="flex-1 space-y-2 overflow-y-auto">
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
