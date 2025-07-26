import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Plus, Trash2, RefreshCw, Globe, Clock, TrendingUp, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompetitorChange {
  id: string;
  type: 'price' | 'content' | 'news' | 'product';
  description: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
}

interface Competitor {
  id: string;
  name: string;
  url: string;
  favicon?: string;
  lastChecked: string;
  status: 'active' | 'error' | 'monitoring';
  changes: CompetitorChange[];
  hasNewChanges: boolean;
  currentPrice?: string;
  lastNews?: string;
  addedAt: string;
}

const CompetitorMonitoringPage = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'Amazon',
      url: 'https://amazon.com/dp/B08N5WRWNW',
      favicon: '/lovable-uploads/0f249b3c-1548-4350-8ecc-d6f2035b6de7.png',
      lastChecked: '2024-01-26 14:30',
      status: 'active',
      changes: [
        {
          id: 'c1',
          type: 'price',
          description: '价格下调',
          oldValue: '$299.99',
          newValue: '$249.99',
          timestamp: '2024-01-26 14:30'
        }
      ],
      hasNewChanges: true,
      currentPrice: '$249.99',
      lastNews: 'Echo Dot特价促销活动',
      addedAt: '2024-01-25 10:00'
    },
    {
      id: '2',
      name: 'Apple Store',
      url: 'https://apple.com/iphone-15',
      favicon: '/lovable-uploads/4df540b4-6a10-475f-aa91-f370945c97ef.png',
      lastChecked: '2024-01-26 14:25',
      status: 'active',
      changes: [
        {
          id: 'c2',
          type: 'news',
          description: '发布新产品公告',
          newValue: 'iPhone 15 Pro Max新颜色上市',
          timestamp: '2024-01-26 13:15'
        }
      ],
      hasNewChanges: true,
      currentPrice: '$1199',
      lastNews: 'iPhone 15 Pro Max新颜色上市',
      addedAt: '2024-01-24 15:30'
    },
    {
      id: '3',
      name: 'Best Buy',
      url: 'https://bestbuy.com/laptop-deals',
      favicon: '/lovable-uploads/afb27241-f57c-4aa7-8066-a6b587213c5e.png',
      lastChecked: '2024-01-26 14:20',
      status: 'active',
      changes: [],
      hasNewChanges: false,
      currentPrice: '$899.99',
      lastNews: '年终清仓特价活动',
      addedAt: '2024-01-23 09:15'
    }
  ]);

  const [newUrl, setNewUrl] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();

  // 排序：有新变化的排在前面，然后按最后检查时间排序
  const sortedCompetitors = competitors.sort((a, b) => {
    if (a.hasNewChanges && !b.hasNewChanges) return -1;
    if (!a.hasNewChanges && b.hasNewChanges) return 1;
    return new Date(b.lastChecked).getTime() - new Date(a.lastChecked).getTime();
  });

  const addCompetitor = () => {
    if (!newUrl) {
      toast({
        title: "错误",
        description: "请输入有效的网址",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = new URL(newUrl);
      const name = url.hostname.replace('www.', '');
      
      const newCompetitor: Competitor = {
        id: Date.now().toString(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        url: newUrl,
        lastChecked: new Date().toLocaleString('zh-CN'),
        status: 'monitoring',
        changes: [],
        hasNewChanges: false,
        addedAt: new Date().toLocaleString('zh-CN')
      };

      setCompetitors([newCompetitor, ...competitors]);
      setNewUrl('');
      
      toast({
        title: "成功",
        description: "竞品已添加到监控列表",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "请输入有效的网址格式",
        variant: "destructive",
      });
    }
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    toast({
      title: "已删除",
      description: "竞品已从监控列表中移除",
    });
  };

  const markAsViewed = (id: string) => {
    setCompetitors(competitors.map(c => 
      c.id === id ? { ...c, hasNewChanges: false } : c
    ));
  };

  const refreshAll = () => {
    setIsMonitoring(true);
    // 模拟刷新过程
    setTimeout(() => {
      setCompetitors(competitors.map(c => ({
        ...c,
        lastChecked: new Date().toLocaleString('zh-CN'),
        status: 'active' as const
      })));
      setIsMonitoring(false);
      toast({
        title: "刷新完成",
        description: "所有竞品数据已更新",
      });
    }, 2000);
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'price': return <DollarSign className="h-4 w-4" />;
      case 'news': return <TrendingUp className="h-4 w-4" />;
      case 'content': return <Globe className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'price': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'news': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'content': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">竞品监控</h1>
          <p className="text-muted-foreground">
            实时监控竞品动态，及时掌握市场变化
          </p>
        </div>
        <Button onClick={refreshAll} disabled={isMonitoring}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isMonitoring ? 'animate-spin' : ''}`} />
          {isMonitoring ? '监控中...' : '全部刷新'}
        </Button>
      </div>

      {/* 添加竞品 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            添加竞品监控
          </CardTitle>
          <CardDescription>
            输入竞品网页地址，系统将自动监控价格变动、新闻更新等信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="url">网页地址</Label>
              <Input
                id="url"
                placeholder="https://example.com/product"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addCompetitor}>
                <Plus className="mr-2 h-4 w-4" />
                添加监控
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{competitors.length}</p>
                <p className="text-sm text-muted-foreground">监控竞品</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {competitors.filter(c => c.hasNewChanges).length}
                </p>
                <p className="text-sm text-muted-foreground">有新变化</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <RefreshCw className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {competitors.filter(c => c.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">监控正常</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 竞品列表 */}
      <div className="space-y-4">
        {sortedCompetitors.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">暂无竞品监控</h3>
              <p className="text-muted-foreground">添加您的第一个竞品开始监控</p>
            </CardContent>
          </Card>
        ) : (
          sortedCompetitors.map((competitor) => (
            <Card key={competitor.id} className={`transition-all duration-200 ${
              competitor.hasNewChanges ? 'ring-2 ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-950/20' : ''
            }`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={competitor.favicon} alt={competitor.name} />
                      <AvatarFallback>
                        {competitor.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{competitor.name}</h3>
                        {competitor.hasNewChanges && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            有新变化
                          </Badge>
                        )}
                        <Badge variant={competitor.status === 'active' ? 'default' : 'secondary'}>
                          {competitor.status === 'active' ? '正常' : competitor.status === 'error' ? '错误' : '监控中'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ExternalLink className="h-4 w-4" />
                        <a href={competitor.url} target="_blank" rel="noopener noreferrer" 
                           className="hover:text-primary hover:underline">
                          {competitor.url}
                        </a>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {competitor.currentPrice && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-sm">当前价格: {competitor.currentPrice}</span>
                          </div>
                        )}
                        
                        {competitor.lastNews && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-sm truncate">最新: {competitor.lastNews}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">检查: {competitor.lastChecked}</span>
                        </div>
                      </div>

                      {/* 变化历史 */}
                      {competitor.changes.length > 0 && (
                        <div className="mt-4">
                          <Separator className="mb-3" />
                          <h4 className="text-sm font-medium mb-2">最近变化</h4>
                          <ScrollArea className="h-32">
                            <div className="space-y-2">
                              {competitor.changes.map((change) => (
                                <div key={change.id} className={`p-3 rounded-lg ${getChangeColor(change.type)}`}>
                                  <div className="flex items-start gap-2">
                                    {getChangeIcon(change.type)}
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{change.description}</p>
                                      {change.oldValue && change.newValue && (
                                        <p className="text-xs mt-1">
                                          {change.oldValue} → {change.newValue}
                                        </p>
                                      )}
                                      {change.newValue && !change.oldValue && (
                                        <p className="text-xs mt-1">{change.newValue}</p>
                                      )}
                                      <p className="text-xs mt-1 opacity-70">
                                        {change.timestamp}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {competitor.hasNewChanges && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsViewed(competitor.id)}
                      >
                        标为已读
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCompetitor(competitor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CompetitorMonitoringPage;