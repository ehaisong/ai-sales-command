
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Mail, Bot } from 'lucide-react';
import { Email } from '@/types/email';

interface ConversationHistoryProps {
  originalEmail: Email;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ originalEmail }) => {
  // 模拟历史对话数据
  const conversations = [
    {
      id: '1',
      from: originalEmail.from,
      content: '您好，我想了解贵公司的产品价格和技术规格。我们是一家制造企业，需要大批量采购。',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isAI: false
    },
    {
      id: '2',
      from: 'ai-assistant@company.com',
      content: '感谢您的咨询！我们的产品具有优异的性能和竞争力的价格。我已经为您准备了详细的产品规格和报价单，请查收附件。',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
      isAI: true
    },
    {
      id: '3',
      from: originalEmail.from,
      content: originalEmail.content,
      timestamp: originalEmail.timestamp,
      isAI: false
    }
  ];

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">历史对话</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {conversations.map((conv) => (
            <div key={conv.id} className="flex space-x-3">
              <Avatar className={`h-8 w-8 flex items-center justify-center text-white text-xs font-medium ${
                conv.isAI ? 'bg-monday-blue' : 'bg-gradient-to-br from-primary to-accent'
              }`}>
                {conv.isAI ? <Bot className="h-4 w-4" /> : getInitials(conv.from)}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">
                    {conv.isAI ? 'AI业务员' : conv.from}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(conv.timestamp, { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
                <div className={`text-sm p-3 rounded-lg ${
                  conv.isAI ? 'bg-monday-blue/10 border-l-2 border-l-monday-blue' : 'bg-gray-50'
                }`}>
                  {conv.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationHistory;
