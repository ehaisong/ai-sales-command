
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Building2, User, MessageSquare, Phone, Mail, Calendar, TrendingUp, Send, Book, UserCheck, Search, Users, Clock, Database, Check } from 'lucide-react';
import { Customer } from '@/types/customer';
import CustomerInsightsPanel from "./CustomerInsightsPanel";
import CustomerKnowledgeDialog from "./CustomerKnowledgeDialog";
import ManualTakeoverDialog from "./ManualTakeoverDialog";

// 导入Dialog相关组件
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CustomerConversationHistoryDialog from "./CustomerConversationHistoryDialog";
import { useToast } from "@/hooks/use-toast";

interface CustomerAIAssistantProps {
  customer: Customer | null;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SearchHistoryItem {
  id: string;
  action: string;
  platform: string;
  results: number;
  timestamp: Date;
  status: 'completed' | 'processing' | 'failed';
}

const CustomerAIAssistant: React.FC<CustomerAIAssistantProps> = ({ customer }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [knowledgeDialogOpen, setKnowledgeDialogOpen] = useState(false);
  const [manualTakeoverOpen, setManualTakeoverOpen] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [knowledgeEntries, setKnowledgeEntries] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>(['LinkedIn', 'Google Maps']);
  const { toast } = useToast();

  const dataSources = [
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'google-maps', name: 'Google Maps', icon: '🗺️' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'x', name: 'X.com', icon: '✕' },
    { id: 'meta', name: 'Meta', icon: '📘' },
    { id: 'wechat', name: '微信', icon: '💬' },
    { id: 'qichacha', name: '企查查', icon: '🏢' },
    { id: 'xiaohongshu', name: '小红书', icon: '📔' }
  ];

  const handleDataSourceToggle = (sourceName: string) => {
    setSelectedDataSources(prev => 
      prev.includes(sourceName) 
        ? prev.filter(s => s !== sourceName)
        : [...prev, sourceName]
    );
  };

  // 模拟搜索历史数据和实时更新
  useEffect(() => {
    // 初始化搜索历史
    const initialHistory: SearchHistoryItem[] = [
      {
        id: '1',
        action: '搜索LinkedIn',
        platform: 'LinkedIn',
        results: 5,
        timestamp: new Date(Date.now() - 5 * 60000),
        status: 'completed'
      },
      {
        id: '2', 
        action: '搜索微信群',
        platform: '微信',
        results: 8,
        timestamp: new Date(Date.now() - 12 * 60000),
        status: 'completed'
      },
      {
        id: '3',
        action: '搜索企查查',
        platform: '企查查',
        results: 3,
        timestamp: new Date(Date.now() - 18 * 60000),
        status: 'completed'
      }
    ];
    setSearchHistory(initialHistory);

    // 模拟实时更新
    const interval = setInterval(() => {
      const platforms = ['LinkedIn', '微信', '企查查', '钉钉', '脉脉', '小红书'];
      const actions = ['搜索', '扫描', '挖掘', '分析'];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newItem: SearchHistoryItem = {
        id: Date.now().toString(),
        action: `${randomAction}${randomPlatform}`,
        platform: randomPlatform,
        results: Math.floor(Math.random() * 10) + 1,
        timestamp: new Date(),
        status: Math.random() > 0.1 ? 'completed' : 'processing'
      };

      setSearchHistory(prev => [newItem, ...prev.slice(0, 9)]); // 保持最新10条记录
    }, 8000); // 每8秒更新一次

    return () => clearInterval(interval);
  }, []);

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

    // 如果是手动模式，不自动回复
    if (isManualMode) return;

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

  const handleManualTakeover = () => {
    setIsManualMode(true);
    toast({
      title: "接管成功",
      description: `已成功接管客户 ${customer?.name} 的对话，AI自动回复已暂停。`,
    });
  };

  const handleToggleMode = () => {
    setIsManualMode(!isManualMode);
    toast({
      title: isManualMode ? "AI模式已启用" : "手动模式已启用",
      description: isManualMode 
        ? "AI业务员将自动处理客户对话。" 
        : "您现在手动处理客户对话，AI自动回复已暂停。",
    });
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`;
    return `${Math.floor(diffInSeconds / 86400)}天前`;
  };

  if (!customer) {
    return (
      <Card className="h-fit transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>客户搜索历史</span>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                  <Database className="h-4 w-4 mr-1" />
                  数据源 ({selectedDataSources.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <div className="font-medium">选择搜索数据源</div>
                  <div className="grid grid-cols-2 gap-2">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all hover:bg-accent ${
                          selectedDataSources.includes(source.name) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border'
                        }`}
                        onClick={() => handleDataSourceToggle(source.name)}
                      >
                        <span className="text-lg">{source.icon}</span>
                        <span className="text-sm font-medium flex-1">{source.name}</span>
                        {selectedDataSources.includes(source.name) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    已选择 {selectedDataSources.length} 个数据源
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {searchHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    item.status === 'completed' ? 'bg-green-100' : 
                    item.status === 'processing' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'completed' ? (
                      <Users className="h-4 w-4 text-green-600" />
                    ) : item.status === 'processing' ? (
                      <Search className="h-4 w-4 text-yellow-600 animate-spin" />
                    ) : (
                      <Users className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {item.action}，获取{item.results}位潜在客户
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={item.status === 'completed' ? 'secondary' : item.status === 'processing' ? 'outline' : 'destructive'}
                  className="text-xs"
                >
                  {item.status === 'completed' ? '已完成' : 
                   item.status === 'processing' ? '进行中' : '失败'}
                </Badge>
              </div>
            ))}
            {searchHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                暂无搜索历史记录
              </div>
            )}
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
      <Card className="!p-0 transition-all duration-200 hover:shadow-md">
        <CardHeader className="p-3 pb-2">
          {/* 顶部标题：头像+客户名称 */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-110">
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
                <Button variant="outline" size="sm" className="ml-4 h-8 px-3 py-1 text-xs transition-all duration-200 hover:scale-105">
                  交流历史
                </Button>
              </DialogTrigger>
              {dialogOpen && (
                <CustomerConversationHistoryDialog customer={customer} />
              )}
            </Dialog>
            {/* 知识库按钮 */}
            <Dialog open={knowledgeDialogOpen} onOpenChange={setKnowledgeDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 h-8 px-3 py-1 text-xs flex items-center gap-1 transition-all duration-200 hover:scale-105"
                  title="客户知识库"
                >
                  <Book className="h-4 w-4" />
                  知识库
                </Button>
              </DialogTrigger>
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
          {/* 手动接管按钮 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{customer.customerScore}</span>
              </div>
              <span className={`text-xs ${insight.color}`}>{insight.text}</span>
            </div>
            <div className="flex items-center space-x-2">
              {isManualMode && (
                <Badge variant="outline" className="text-xs px-2 py-1 bg-orange-50 text-orange-600 border-orange-200">
                  手动模式
                </Badge>
              )}
              <Button
                onClick={isManualMode ? handleToggleMode : () => setManualTakeoverOpen(true)}
                size="sm"
                variant={isManualMode ? "outline" : "default"}
                className={`h-7 px-3 text-xs transition-all duration-200 hover:scale-105 ${
                  isManualMode 
                    ? "border-green-200 text-green-700 hover:bg-green-50" 
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                <UserCheck className="h-3 w-3 mr-1" />
                {isManualMode ? "启用AI" : "手动接管"}
              </Button>
            </div>
          </div>
          {/* 标签 */}
          <div className="flex flex-wrap gap-1">
            {customer.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 transition-all duration-200 hover:scale-105">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI客户洞察面板 */}
      <div className="transition-all duration-200">
        <CustomerInsightsPanel customer={customer} />
      </div>

      {/* AI业务员对话框 */}
      <Card className="h-[360px] flex flex-col mt-3 transition-all duration-200 hover:shadow-md">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>AI 业务员</span>
            {isManualMode && (
              <Badge variant="outline" className="text-xs ml-auto bg-orange-50 text-orange-600 border-orange-200">
                手动模式
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-2 p-4 pt-0">
          {/* 对话历史 */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {messages.length === 0 && (
              <div className="text-center py-4 text-muted-foreground text-sm">
                向AI业务员咨询关于 {customer.name} 的信息
                {isManualMode && (
                  <div className="text-xs text-orange-600 mt-1">
                    当前为手动模式，AI不会自动回复
                  </div>
                )}
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] ${
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
              className="flex-1 transition-all duration-200 focus:scale-[1.02]"
            />
            <Button onClick={handleSendMessage} size="sm" className="transition-all duration-200 hover:scale-105">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 手动接管确认对话框 */}
      <ManualTakeoverDialog
        open={manualTakeoverOpen}
        onOpenChange={setManualTakeoverOpen}
        customer={{
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          lastContactDate: new Date(),
          unreadCount: 0,
          totalConversations: 1,
          isAIManaged: true,
          priority: 'medium',
          tags: customer.tags,
          channels: ['email'],
          status: 'active'
        }}
        onConfirm={handleManualTakeover}
      />
    </div>
  );
};

export default CustomerAIAssistant;
