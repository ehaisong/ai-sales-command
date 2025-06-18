
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, Plus, Upload } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '您好！我是小思，您的AI业务员。有什么可以帮助您的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '我已经收到您的消息，正在为您处理相关事务...',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="h-[calc(100vh-400px)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 py-3">
        <CardTitle className="text-base flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>小思</span>
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="text-xs h-7">
            历史对话
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-3 px-4 pb-4">
        {/* 聊天内容区域 */}
        <div className="flex-1 space-y-3 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.isUser
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Upload className="h-3 w-3" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入消息..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-8 text-sm"
          />
          <Button onClick={handleSendMessage} size="sm" className="h-8">
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
