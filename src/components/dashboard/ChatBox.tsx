
import React, { useState, useRef, useEffect } from 'react';
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
      content: '您好！我是小思，您的AI助手。有什么可以帮助您的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <Card className="h-[500px] flex flex-col bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <CardTitle className="text-base flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-semibold">小思</span>
            <p className="text-xs text-gray-500 font-normal">在线 · 随时为您服务</p>
          </div>
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="text-xs h-7 text-gray-600 hover:text-primary transition-all duration-200">
            历史对话
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-600 hover:text-primary transition-all duration-200 hover:scale-110">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col px-4 pb-4 pt-4 min-h-0">
        {/* 聊天内容区域 - 固定高度，滚动优化 */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div 
            ref={scrollAreaRef}
            className="h-full overflow-y-auto space-y-3 pr-1 scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
            }}
          >
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed break-words transition-all duration-200 hover:shadow-sm ${
                    message.isUser
                      ? 'bg-primary text-white rounded-br-sm hover:bg-primary/90'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm hover:bg-gray-200'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                  <p className={`text-xs mt-1 transition-colors duration-200 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 输入区域 - 固定在底部，增强过渡效果 */}
        <div className="flex space-x-2 pt-3 mt-auto border-t border-gray-100 flex-shrink-0">
          <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-gray-300 hover:border-primary/50 flex-shrink-0 transition-all duration-200 hover:scale-110">
            <Upload className="h-4 w-4" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入消息..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-9 text-sm border-gray-300 focus:border-primary min-w-0 transition-all duration-200 focus:ring-2 focus-visible:ring-primary/20"
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm" 
            className="h-9 px-4 bg-primary hover:bg-primary/90 flex-shrink-0 transition-all duration-200 hover:scale-105"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;
