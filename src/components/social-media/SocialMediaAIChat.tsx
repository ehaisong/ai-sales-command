import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Send, Upload, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const initialMessages = [
  { 
    id: 1,
    sender: "bot", 
    content: "👋 我是您的社交媒体AI助手！可以帮您：\n• 📝 创作优质内容\n• 📊 分析发文策略\n• 🎯 优化投放效果\n• 📈 制定内容日历\n\n请告诉我您需要什么帮助？",
    timestamp: "10:00"
  },
];

const SocialMediaAIChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot" as const,
        content: generateSocialMediaResponse(messageText),
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateSocialMediaResponse = (userMessage: string): string => {
    const responses = [
      "💡 基于您的品牌调性，我建议这样创作内容：\n\n「🚀 突破传统外贸模式！我们的AI助手帮助制造企业实现数字化转型，平均提升30%询盘质量。\n\n✅ 智能客户分析\n✅ 个性化营销方案\n✅ 24/7自动跟进\n\n#外贸数字化 #AI营销 #制造业转型」\n\n记得配上产品功能截图会更有说服力！",
      "📊 分析您的发文数据，我发现：\n\n• LinkedIn发文互动率最高，建议增加发布频次\n• 产品展示类内容比纯文字表现好35%\n• 周二和周四发布效果最佳\n\n💡 建议优化方向：\n1. 增加客户成功案例分享\n2. 制作更多产品演示视频\n3. 定期发布行业洞察内容",
      "📅 为您制定下周内容计划：\n\n周一：行业趋势分析 (LinkedIn)\n周二：产品功能介绍 (Instagram)\n周三：客户成功案例 (LinkedIn)\n周四：团队日常分享 (Instagram)\n周五：周末互动话题 (全平台)\n\n每条内容我都会为您量身定制，确保符合平台特色和受众偏好。",
      "🎯 提高粉丝互动率的策略：\n\n1. **内容互动性**\n   • 多提问，邀请评论\n   • 发起投票和讨论\n   • 分享背后故事\n\n2. **发布时机**\n   • 分析粉丝活跃时间\n   • 避开竞争激烈时段\n\n3. **回复策略**\n   • 及时回复评论\n   • 主动参与话题讨论\n\n需要我帮您制定具体的互动内容吗？"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className="h-[800px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">社交媒体AI助手</h3>
            <p className="text-xs text-gray-500">专业内容创作 · 数据分析</p>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            专业版
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
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

      {/* File Upload Area */}
      {selectedFiles.length > 0 && (
        <div className="p-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-xs">
                <span className="truncate max-w-[100px]">{file.name}</span>
                <button onClick={() => removeFile(index)} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2 mb-2">
          <label className="flex-1">
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button variant="outline" size="sm" className="w-full text-xs" asChild>
              <span>
                <Upload className="w-3 h-3 mr-1" />
                上传素材
              </span>
            </Button>
          </label>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="描述您的内容需求或提出问题..."
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
          AI助手会根据您的品牌知识库提供专业建议
        </p>
      </div>
    </Card>
  );
};

export default SocialMediaAIChat;
