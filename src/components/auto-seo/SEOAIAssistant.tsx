import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Link, 
  Search, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SEOAIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: "您好！我是您的SEO专家助手。我可以帮您分析网站SEO状况，提供优化建议，分析关键词策略等。请告诉我您需要什么帮助？",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const quickActions = [
    { icon: Link, label: "分析我的官网", action: "analyze_website" },
    { icon: Search, label: "关键词研究", action: "keyword_research" },
    { icon: BarChart3, label: "竞争对手分析", action: "competitor_analysis" },
    { icon: AlertTriangle, label: "技术SEO检查", action: "technical_seo" }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsAnalyzing(true);

    // 模拟AI回复
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "我正在分析您的请求，请稍等...",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    let content = "";
    switch (action) {
      case "analyze_website":
        content = "请输入您要分析的网站URL，我将为您提供详细的SEO分析报告。";
        break;
      case "keyword_research":
        content = "请告诉我您的行业或产品，我将帮您分析相关关键词的搜索量、竞争度和优化建议。";
        break;
      case "competitor_analysis":
        content = "请提供您的竞争对手网站，我将分析他们的SEO策略和关键词布局。";
        break;
      case "technical_seo":
        content = "请提供您的网站URL，我将检查技术SEO问题，包括页面速度、移动适配、结构化数据等。";
        break;
      default:
        content = "我可以帮您解决各种SEO相关问题。";
    }

    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "assistant",
      content,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  return (
    <Card className="max-h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="w-5 h-5 text-blue-600" />
          SEO AI助手
        </CardTitle>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-gray-500">在线</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* 快速操作按钮 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="h-auto p-2 text-xs"
            >
              <action.icon className="w-3 h-3 mb-1" />
              <span className="text-center">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <div className="animate-pulse">正在分析...</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入网址或SEO问题..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOAIAssistant;
