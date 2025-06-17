
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistantChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '您好！我是您的AI写作助手。我可以帮您：\n• 优化邮件内容\n• 调整语气和措辞\n• 提供回复建议\n• 检查语法错误\n\n有什么需要帮助的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '我建议您在邮件中采用更加专业友好的语气，可以在开头表达对客户的感谢，并在结尾提供进一步沟通的联系方式。',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 text-monday-blue" />
          AI写作助手
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 消息区域 */}
        <div className="max-h-60 overflow-y-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start space-x-2 max-w-[80%]">
                {!message.isUser && (
                  <Avatar className="h-6 w-6 bg-monday-blue flex items-center justify-center">
                    <Bot className="h-3 w-3 text-white" />
                  </Avatar>
                )}
                <div
                  className={`p-2 rounded-lg text-xs ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                {message.isUser && (
                  <Avatar className="h-6 w-6 bg-gray-600 flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </Avatar>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="询问AI助手..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-8 text-sm"
          />
          <Button onClick={handleSendMessage} size="sm" className="h-8">
            <Send className="h-3 w-3" />
          </Button>
        </div>

        {/* 快捷建议 */}
        <div className="flex flex-wrap gap-1">
          {['优化语气', '检查语法', '添加客套话', '专业用词'].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={() => setInputValue(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantChat;
