
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Send, Plus, Lightbulb, FileText, MessageSquare, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// 模拟聊天历史
const initialMessages = [
  { 
    id: 1,
    sender: "bot", 
    content: "👋 您好！我是AI业务员助手，可以帮您管理品牌知识库。您可以：\n• 询问产品相关问题\n• 添加新的知识内容\n• 优化现有信息\n• 分析客户需求",
    timestamp: "10:00"
  },
];

// 快捷提问选项
const quickQuestions = [
  { text: "我们的主要产品有哪些？", icon: FileText },
  { text: "公司的核心竞争优势是什么？", icon: Lightbulb },
  { text: "最新的产品发布信息", icon: Sparkles },
  { text: "如何向客户介绍A100产品？", icon: MessageSquare },
];

type AIChatProps = {
  onAddEntry: () => void;
};

const AIChat = ({ onAddEntry }: AIChatProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      sender: "user" as const,
      content: messageText,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // 模拟AI回复
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot" as const,
        content: generateBotResponse(messageText),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "根据我们的知识库，我找到了相关信息。我们公司专注于智能家居领域，主要产品包括A100智能音箱和B200智能门锁系列。需要我提供更详细的产品信息吗？",
      "这是一个很好的问题！基于现有知识库内容，我建议我们可以从以下几个角度来完善这部分信息...",
      "我注意到您询问的内容在知识库中信息较少，建议您上传相关文档或提供更多细节，这样我可以为您提供更准确的答案。",
      "让我为您总结一下相关要点。根据最新的产品资料和市场反馈，我建议这样向客户介绍...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className="h-[600px] flex flex-col">
      {/* 聊天头部 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">AI业务员助手</h3>
            <p className="text-xs text-gray-500">在线 · 智能分析中</p>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs">
            Beta
          </Badge>
        </div>
      </div>

      {/* 快捷提问 */}
      <div className="p-3 border-b border-gray-50">
        <p className="text-xs text-gray-600 mb-2">快速提问:</p>
        <div className="grid grid-cols-1 gap-2">
          {quickQuestions.map((question, index) => {
            const IconComponent = question.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-2"
                onClick={() => handleSend(question.text)}
              >
                <IconComponent className="w-3 h-3 mr-2 flex-shrink-0" />
                <span className="text-left line-clamp-1">{question.text}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 聊天消息区域 */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${
                    msg.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {msg.sender === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI输入状态 */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <Bot className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2 mb-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onAddEntry}
            className="flex-1 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            添加知识
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="向AI助手提问或描述需求..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="text-sm"
            disabled={isTyping}
          />
          <Button 
            size="sm" 
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI助手正在学习中，回复仅供参考
        </p>
      </div>
    </Card>
  );
};

export default AIChat;
