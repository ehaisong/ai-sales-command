import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { 
  TrendingUp, 
  Search, 
  Activity, 
  Eye, 
  BarChart3, 
  Zap, 
  Globe,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

// Mock data for trends
const trendData = [
  { date: "2024-01", value: 45, keyword: "无线耳机" },
  { date: "2024-02", value: 52, keyword: "无线耳机" },
  { date: "2024-03", value: 38, keyword: "无线耳机" },
  { date: "2024-04", value: 65, keyword: "无线耳机" },
  { date: "2024-05", value: 78, keyword: "无线耳机" },
  { date: "2024-06", value: 85, keyword: "无线耳机" },
];

const keywordTrends = [
  { keyword: "AI智能音箱", growth: "+245%", volume: "2.3M", competition: "high", trend: "up" },
  { keyword: "无线充电器", growth: "+156%", volume: "1.8M", competition: "medium", trend: "up" },
  { keyword: "智能手表", growth: "+89%", volume: "3.2M", competition: "high", trend: "up" },
  { keyword: "蓝牙耳机", growth: "+67%", volume: "4.1M", competition: "high", trend: "stable" },
  { keyword: "便携电源", growth: "+234%", volume: "890K", competition: "low", trend: "up" },
];

const marketAnalysis = [
  {
    platform: "Amazon",
    category: "电子产品",
    trending: "AI智能设备",
    growth: "+189%",
    opportunity: "high"
  },
  {
    platform: "Shopify",
    category: "家居用品", 
    trending: "智能家居",
    growth: "+145%",
    opportunity: "medium"
  },
  {
    platform: "eBay",
    category: "时尚配饰",
    trending: "可穿戴设备",
    growth: "+98%",
    opportunity: "high"
  },
];

const TrendAnalysisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">爆款趋势分析</h1>
          <p className="text-gray-600">
            基于AI分析品牌知识库，结合多平台数据源，跟踪市场爆款商品趋势
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              趋势搜索
            </CardTitle>
            <CardDescription>
              输入关键词或产品类别，获取实时趋势分析报告
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                placeholder="输入关键词，如：智能手表、无线耳机..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing ? "分析中..." : "分析趋势"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="keywords" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="keywords">关键词趋势</TabsTrigger>
            <TabsTrigger value="markets">市场分析</TabsTrigger>
            <TabsTrigger value="platforms">平台数据</TabsTrigger>
            <TabsTrigger value="reports">分析报告</TabsTrigger>
          </TabsList>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    搜索趋势
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: {
                        label: "搜索指数",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Hot Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    热门关键词
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {keywordTrends.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{item.keyword}</div>
                          <div className="text-sm text-gray-500">搜索量: {item.volume}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={item.competition === 'high' ? 'destructive' : item.competition === 'medium' ? 'default' : 'secondary'}>
                            {item.competition === 'high' ? '高竞争' : item.competition === 'medium' ? '中竞争' : '低竞争'}
                          </Badge>
                          <span className="text-green-600 font-medium">{item.growth}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketAnalysis.map((market, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{market.platform}</span>
                      <Badge variant={market.opportunity === 'high' ? 'default' : 'secondary'}>
                        {market.opportunity === 'high' ? '高机会' : '中机会'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">热门类别</div>
                        <div className="font-medium">{market.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">趋势产品</div>
                        <div className="font-medium">{market.trending}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">增长率</div>
                        <div className="font-medium text-green-600">{market.growth}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  数据源监控
                </CardTitle>
                <CardDescription>
                  实时监控各大平台的数据采集状态
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Google Trends", "Amazon", "eBay", "Shopify", "Reddit", "X (Twitter)", "Alibaba", "Perplexity.ai"].map((platform) => (
                    <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{platform}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    分析报告
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    导出报告
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">电子产品趋势报告</h3>
                      <Badge>今日</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      基于过去30天的数据分析，AI智能设备类产品呈现强劲增长趋势，预计未来3个月将继续保持上升态势...
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">家居用品市场分析</h3>
                      <Badge variant="secondary">昨日</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      智能家居产品在各大电商平台表现活跃，其中智能音箱、智能插座等品类增长显著...
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">竞品监控周报</h3>
                      <Badge variant="outline">本周</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      主要竞争对手在智能穿戴设备领域推出新品，建议关注市场动态并调整产品策略...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrendAnalysisPage;