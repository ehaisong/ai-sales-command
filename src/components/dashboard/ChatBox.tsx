
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageSquare, Plus, Upload, Mic, Image } from 'lucide-react';

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
      content: '您好！我是小思，您的AI业务员。今天已为您处理了多项任务，有什么需要我帮助的吗？',
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
        content: '我已经收到您的消息，正在为您处理相关事务。让我为您分析当前的业务状况...',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="h-[calc(100vh-500px)] flex flex-col border-l-4 border-l-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-base flex items-center space-x-2">
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
          </div>
          <span>与小思对话</span>
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
            历史
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-3 px-4 pb-4">
        {/* 聊天内容区域 */}
        <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-gray-100 text-foreground rounded-bl-sm border'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('zh-CN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 输入区域 */}
        <div className="border-t pt-3">
          <div className="flex space-x-2 mb-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Upload className="h-3 w-3 mr-1" />
              文件
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Image className="h-3 w-3 mr-1" />
              图片
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <Mic className="h-3 w-3 mr-1" />
              语音
            </Button>
          </div>
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入您的问题或指令..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-9 text-sm"
            />
            <Button onClick={handleSendMessage} size="sm" className="h-9 px-3">
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
