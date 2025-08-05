import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Search, 
  Activity, 
  Eye, 
  BarChart3, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Star,
  ShoppingCart,
  TrendingDown,
  CheckSquare,
  Square
} from "lucide-react";
import type { TrendingProduct, MarketAnalysisReport } from "@/types/trendAnalysis";
import TrendAlertDialog from "@/components/trend-analysis/TrendAlertDialog";
import ExportReportDialog from "@/components/trend-analysis/ExportReportDialog";
import CompetitorAnalysisDialog from "@/components/trend-analysis/CompetitorAnalysisDialog";

// Mock data for trending products
const mockTrendingProducts: TrendingProduct[] = [
  {
    id: "1",
    name: "AI智能蓝牙耳机 Pro",
    image: "/lovable-uploads/5202474d-8274-4c8d-b3ea-7f6dcb686ad5.png",
    price: 299,
    originalPrice: 499,
    sales: 15678,
    salesGrowth: "+245%",
    category: "电子产品",
    brand: "TechBrand",
    platform: "Amazon",
    trendScore: 95,
    predictedDemand: "high",
    lastUpdated: "2024-01-15",
    tags: ["AI", "蓝牙", "降噪"]
  },
  {
    id: "2",
    name: "智能运动手表 X5",
    image: "/lovable-uploads/68aae36a-c411-47a4-861b-528e36df6415.png",
    price: 899,
    originalPrice: 1299,
    sales: 12340,
    salesGrowth: "+189%",
    category: "可穿戴设备",
    brand: "SmartFit",
    platform: "Shopify",
    trendScore: 92,
    predictedDemand: "high",
    lastUpdated: "2024-01-14",
    tags: ["运动", "健康", "GPS"]
  },
  {
    id: "3",
    name: "无线快充充电宝 20000mAh",
    image: "/lovable-uploads/29feb998-ef36-4668-a8ef-d885ac962b95.png",
    price: 159,
    originalPrice: 239,
    sales: 8970,
    salesGrowth: "+156%",
    category: "电子配件",
    brand: "PowerMax",
    platform: "eBay",
    trendScore: 88,
    predictedDemand: "medium",
    lastUpdated: "2024-01-13",
    tags: ["快充", "便携", "大容量"]
  },
  {
    id: "4",
    name: "智能家居音箱 Mini",
    image: "/lovable-uploads/d013a19b-a0cc-434d-83da-4ee395646e98.png",
    price: 199,
    originalPrice: 299,
    sales: 6789,
    salesGrowth: "+134%",
    category: "智能家居",
    brand: "HomeSmart",
    platform: "Amazon",
    trendScore: 85,
    predictedDemand: "medium",
    lastUpdated: "2024-01-12",
    tags: ["语音控制", "智能家居", "音质"]
  }
];

const mockReports: MarketAnalysisReport[] = [
  {
    id: "1",
    title: "AI智能设备市场突破性增长报告",
    summary: "AI智能耳机和智能音箱在过去30天内表现出色，预计未来3个月将继续保持强劲增长势头。",
    date: "2024-01-15",
    category: "电子产品",
    insights: [
      "AI功能成为消费者首选特性",
      "降噪技术需求大幅提升",
      "价格敏感度下降，用户更注重功能"
    ],
    recommendations: [
      "加大AI功能宣传力度",
      "优化降噪算法",
      "建立高端产品线"
    ],
    confidenceLevel: 95
  },
  {
    id: "2",
    title: "可穿戴设备健康监测趋势分析",
    summary: "健康监测功能成为智能手表购买决策的关键因素，相关产品销量持续攀升。",
    date: "2024-01-14", 
    category: "可穿戴设备",
    insights: [
      "血氧检测成为标配需求",
      "运动模式多样化趋势明显",
      "续航能力仍是用户痛点"
    ],
    recommendations: [
      "增加专业健康功能",
      "扩展运动模式种类",
      "提升电池续航技术"
    ],
    confidenceLevel: 90
  }
];

const TrendAnalysisPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("7days");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  
  // Selection functionality
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Dialog states
  const [trendAlertOpen, setTrendAlertOpen] = useState(false);
  const [exportReportOpen, setExportReportOpen] = useState(false);
  const [competitorAnalysisOpen, setCompetitorAnalysisOpen] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze();
  };

  // Selection handlers
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === mockTrendingProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(mockTrendingProducts.map(p => p.id));
    }
  };

  // Quick action handlers
  const handleTrendAlert = () => {
    if (selectedProducts.length === 0) return;
    setTrendAlertOpen(true);
  };

  const handleExportReport = () => {
    if (selectedProducts.length === 0) return;
    setExportReportOpen(true);
  };

  const handleCompetitorAnalysis = () => {
    if (selectedProducts.length === 0) return;
    setCompetitorAnalysisOpen(true);
  };

  const getDemandBadgeColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getDemandText = (demand: string) => {
    switch (demand) {
      case 'high': return '高需求';
      case 'medium': return '中需求';
      case 'low': return '低需求';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">爆款商品趋势分析</h1>
          <p className="text-muted-foreground">
            基于AI分析品牌知识库，发现最新爆款商品机会，实时跟踪市场趋势
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              筛选条件
            </CardTitle>
            <CardDescription>
              根据时间、类别和平台筛选爆款商品
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">时间范围</label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">近7天</SelectItem>
                    <SelectItem value="30days">近30天</SelectItem>
                    <SelectItem value="90days">近90天</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">商品类别</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类别</SelectItem>
                    <SelectItem value="electronics">电子产品</SelectItem>
                    <SelectItem value="wearable">可穿戴设备</SelectItem>
                    <SelectItem value="home">智能家居</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">销售平台</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部平台</SelectItem>
                    <SelectItem value="amazon">Amazon</SelectItem>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="ebay">eBay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">搜索商品</label>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    placeholder="输入商品名称..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Products List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    爆款商品列表
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProducts.length > 0 && (
                      <Badge variant="secondary" className="px-2 py-1">
                        已选择 {selectedProducts.length} 个商品
                      </Badge>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      导出数据
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>根据销量增长和市场趋势分析的潜在爆款商品</span>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedProducts.length === mockTrendingProducts.length}
                      onCheckedChange={selectAllProducts}
                    />
                    <span className="text-sm">全选</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrendingProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className={`border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                        selectedProducts.includes(product.id) ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="flex gap-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleProductSelection(product.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                            onError={(e) => {
                              console.log('Image load error:', product.image);
                              e.currentTarget.style.border = '2px solid red';
                            }}
                            onLoad={() => {
                              console.log('Image loaded successfully:', product.image);
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <div className="flex items-center gap-3 flex-shrink-0 min-w-fit">
                              <Badge variant={getDemandBadgeColor(product.predictedDemand)} className="whitespace-nowrap">
                                {getDemandText(product.predictedDemand)}
                              </Badge>
                              <div className="flex items-center gap-2 text-right flex-shrink-0 min-w-fit">
                                <span className="text-sm text-muted-foreground whitespace-nowrap">趋势评分</span>
                                <span className="font-bold text-lg whitespace-nowrap">{product.trendScore}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <div className="text-sm text-muted-foreground">当前价格</div>
                              <div className="font-semibold">¥{product.price}</div>
                              {product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">¥{product.originalPrice}</div>
                              )}
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">销量</div>
                              <div className="font-semibold">{product.sales.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">增长率</div>
                              <div className="font-semibold text-green-600">{product.salesGrowth}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">平台</div>
                              <div className="font-semibold">{product.platform}</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1 flex-wrap">
                              {product.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs whitespace-nowrap">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground flex-shrink-0 ml-2">
                              更新时间: {product.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Analysis Reports */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  最新市场分析报告
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {report.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {report.summary}
                      </p>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">关键洞察</div>
                          <ul className="text-xs space-y-1">
                            {report.insights.slice(0, 2).map((insight, index) => (
                              <li key={index} className="text-muted-foreground">• {insight}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">可信度</div>
                            <div className="text-xs font-semibold">{report.confidenceLevel}%</div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs">
                            查看详情
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">快速操作</CardTitle>
                <CardDescription className="text-sm">
                  {selectedProducts.length === 0 
                    ? "请先选择商品以启用快速操作" 
                    : `对 ${selectedProducts.length} 个选中商品执行操作`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleTrendAlert}
                  disabled={selectedProducts.length === 0}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  设置趋势提醒
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleExportReport}
                  disabled={selectedProducts.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  导出完整报告
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleCompetitorAnalysis}
                  disabled={selectedProducts.length === 0}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  竞品对比分析
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog Components */}
      <TrendAlertDialog
        open={trendAlertOpen}
        onOpenChange={setTrendAlertOpen}
        selectedProducts={selectedProducts}
      />
      <ExportReportDialog
        open={exportReportOpen}
        onOpenChange={setExportReportOpen}
        selectedProducts={selectedProducts}
      />
      <CompetitorAnalysisDialog
        open={competitorAnalysisOpen}
        onOpenChange={setCompetitorAnalysisOpen}
        selectedProducts={selectedProducts}
      />
    </div>
  );
};

export default TrendAnalysisPage;