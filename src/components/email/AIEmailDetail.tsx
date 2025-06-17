
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  Send,
  Bot,
  User,
  AlertCircle
} from 'lucide-react';
import { Email } from '@/types/email';

interface AIEmailDetailProps {
  email: Email;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIEmailDetail: React.FC<AIEmailDetailProps> = ({ email }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '您好！我是您的AI业务员小思，刚刚已经回复了客户的询价邮件。有什么需要我协助的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-gray-400';
    }
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '我已经收到您的指导，会在后续的客户沟通中注意这些要点。',
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
              {getInitials(email.from)}
            </Avatar>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{email.from}</h3>
                <Badge variant="secondary" className="text-xs">AI发送</Badge>
                <AlertCircle className={`h-4 w-4 ${getPriorityColor(email.priority)}`} />
              </div>
              <p className="text-sm text-muted-foreground">收件人: {email.to}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(email.timestamp, { 
                  addSuffix: true, 
                  locale: zhCN 
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">{email.subject}</h2>
        </div>
      </CardHeader>
      
      {/* 邮件对话历史区域 */}
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 p-6 overflow-auto">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">客户邮件</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(email.timestamp.getTime() - 60 * 60 * 1000), { 
                    addSuffix: true, 
                    locale: zhCN 
                  })}
                </span>
              </div>
              <div className="text-sm leading-relaxed">
                您好，我对贵公司的产品很感兴趣，希望能获取详细的价格清单和技术规格。我们公司是一家大型制造企业，有长期合作的可能性。期待您的回复。
              </div>
            </div>
            
            <div className="bg-monday-blue/5 border-l-2 border-l-monday-blue p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="h-4 w-4 text-monday-blue" />
                <span className="text-sm font-medium text-monday-blue">AI业务员回复</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(email.timestamp, { 
                    addSuffix: true, 
                    locale: zhCN 
                  })}
                </span>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {email.content}
              </div>
            </div>
          </div>
        </div>
        
        {/* AI对话框区域 */}
        <div className="border-t bg-gray-50/50">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-8 w-8 bg-monday-blue flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </Avatar>
              <span className="text-sm font-medium">AI业务员小思</span>
            </div>
            
            {/* 聊天消息区域 */}
            <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-xs ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-white border text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* 输入区域 */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="向AI业务员咨询或给出指导..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 h-8 text-sm"
              />
              <Button onClick={handleSendMessage} size="sm" className="h-8">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIEmailDetail;
