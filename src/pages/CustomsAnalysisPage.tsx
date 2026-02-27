import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import CustomerDetailDialog from '@/components/customs/CustomerDetailDialog';
import ReportPreviewDialog from '@/components/customs/ReportPreviewDialog';
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Users, 
  Download, 
  Settings, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Sparkles,
  Eye
} from 'lucide-react';

const CustomsAnalysisPage = () => {
  const { toast } = useToast();
  const [autoSync, setAutoSync] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState(['美国', '德国', '英国']);
  const [selectedProducts, setSelectedProducts] = useState(['电子产品', '服装', '家具']);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 模拟海关数据
  const customsData = [
    {
      id: 1,
      country: '美国',
      product: '电子产品',
      importValue: 1250000,
      exportValue: 890000,
      trend: 'up',
      changePercent: 12.5,
      topCompanies: ['Apple Inc.', 'Microsoft Corp.', 'Amazon.com Inc.'],
      lastUpdated: '2025-08-15'
    },
    {
      id: 2,
      country: '德国',
      product: '汽车配件',
      importValue: 980000,
      exportValue: 1560000,
      trend: 'down',
      changePercent: -8.3,
      topCompanies: ['BMW AG', 'Mercedes-Benz Group', 'Volkswagen AG'],
      lastUpdated: '2025-08-14'
    },
    {
      id: 3,
      country: '英国',
      product: '服装',
      importValue: 750000,
      exportValue: 620000,
      trend: 'up',
      changePercent: 15.8,
      topCompanies: ['Next PLC', 'ASOS PLC', 'Primark'],
      lastUpdated: '2025-08-15'
    }
  ];

  // 模拟潜在客户数据
  const potentialCustomers = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      country: '美国',
      product: '电子产品',
      importVolume: 150000,
      matchScore: 95,
      contactInfo: 'info@techcorp.com',
      recentActivity: '新增大额进口订单'
    },
    {
      id: 2,
      name: 'European Fashion Ltd',
      country: '德国',
      product: '服装',
      importVolume: 85000,
      matchScore: 87,
      contactInfo: 'contact@eufashion.de',
      recentActivity: '扩大亚洲供应商网络'
    },
    {
      id: 3,
      name: 'Global Trading Co',
      country: '英国',
      product: '家具',
      importVolume: 120000,
      matchScore: 91,
      contactInfo: 'sales@globaltrading.co.uk',
      recentActivity: '寻找新的家具供应商'
    }
  ];

  // 模拟报告数据
  const reports = [
    {
      id: 'report1',
      title: '2025年8月海关数据月报',
      description: '包含28个国家的贸易数据分析和客户挖掘建议',
      date: '2025-08-15',
      status: 'completed'
    },
    {
      id: 'report2',
      title: '电子产品贸易趋势分析',
      description: '专项分析报告 - 重点关注美国、德国市场',
      date: '2025-08-14',
      status: 'completed'
    },
    {
      id: 'report3',
      title: '服装行业周报',
      description: '预计完成时间: 2025-08-16 15:00',
      status: 'generating'
    }
  ];

  // 处理客户详情查看
  const handleViewCustomerDetail = (customer) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(true);
  };

  // 处理报告预览
  const handlePreviewReport = (report) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
  };

  // 处理联系客户
  const handleContactCustomer = async (customer) => {
    setIsLoading(true);
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "联系请求已发送",
      description: `已向 ${customer.name} 发送合作邀请邮件`,
    });
    
    setIsLoading(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-full">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">海关数据分析</h1>
          <p className="text-gray-600 mt-2">基于全球海关数据的智能客户发现与市场分析</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            同步数据
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">监控国家</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">产品类别</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-muted-foreground">潜在客户</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">匹配精度</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analysis" className="space-y-8 w-full">
        <TabsList className="relative grid w-full grid-cols-4 bg-muted/30 backdrop-blur-sm rounded-xl p-1.5 border-0 shadow-lg">
          <TabsTrigger 
            value="analysis" 
            className="relative flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md hover:bg-background/50 hover:text-foreground/80 group z-10"
          >
            <BarChart3 className="h-4 w-4 transition-colors duration-300 group-data-[state=active]:text-primary" />
            <span className="font-semibold">数据分析</span>
          </TabsTrigger>
          <TabsTrigger 
            value="customers" 
            className="relative flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md hover:bg-background/50 hover:text-foreground/80 group z-10"
          >
            <Users className="h-4 w-4 transition-colors duration-300 group-data-[state=active]:text-primary" />
            <span className="font-semibold">潜在客户</span>
            <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary border-primary/20 text-xs px-1.5 py-0.5 font-medium">
              {potentialCustomers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="relative flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md hover:bg-background/50 hover:text-foreground/80 group z-10"
          >
            <Download className="h-4 w-4 transition-colors duration-300 group-data-[state=active]:text-primary" />
            <span className="font-semibold">分析报告</span>
            <div className="ml-1 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="relative flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium rounded-lg transition-all duration-500 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md hover:bg-background/50 hover:text-foreground/80 group z-10"
          >
            <Settings className="h-4 w-4 transition-colors duration-300 group-data-[state=active]:text-primary" />
            <span className="font-semibold">监控设置</span>
          </TabsTrigger>
        </TabsList>

        {/* 数据分析标签页 */}
        <TabsContent value="analysis" className="space-y-6">
          {/* 数据源状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                数据源状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">美国海关数据库</p>
                    <p className="text-sm text-muted-foreground">最后更新: 2小时前</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">正常</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">欧盟贸易数据</p>
                    <p className="text-sm text-muted-foreground">最后更新: 1小时前</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">正常</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium">亚洲贸易统计</p>
                    <p className="text-sm text-muted-foreground">最后更新: 6小时前</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">延迟</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 海关数据列表 */}
          <Card>
            <CardHeader>
              <CardTitle>最新海关数据分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customsData.map((data) => (
                  <div key={data.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{data.country} - {data.product}</h3>
                          <Badge 
                            variant="outline" 
                            className={`${data.trend === 'up' 
                              ? 'text-green-700 border-green-300 bg-green-50' 
                              : 'text-red-700 border-red-300 bg-red-50'
                            }`}
                          >
                            {data.trend === 'up' ? (
                              <ArrowUp className="h-3 w-3 mr-1 text-green-700" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1 text-red-700" />
                            )}
                            {Math.abs(data.changePercent)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">进口额</p>
                            <p className="font-medium">${data.importValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">出口额</p>
                            <p className="font-medium">${data.exportValue.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-muted-foreground text-sm mb-1">主要贸易商:</p>
                          <div className="flex gap-2 flex-wrap">
                            {data.topCompanies.map((company, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>更新时间</p>
                        <p>{data.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 潜在客户标签页 */}
        <TabsContent value="customers" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-green-600" />
                </div>
                AI智能匹配客户
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {potentialCustomers.length} 个高匹配客户
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {potentialCustomers.map((customer, index) => (
                  <div key={customer.id} className="p-6 border-b last:border-b-0 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50/50 transition-all duration-200 group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                              <span className="font-bold text-green-700">{customer.name.charAt(0)}</span>
                            </div>
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`px-3 py-1 font-medium ${
                              customer.matchScore >= 90 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : customer.matchScore >= 80 
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }`}
                          >
                            匹配度 {customer.matchScore}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div className="space-y-1">
                            <p className="text-muted-foreground font-medium">国家地区</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {customer.country}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground font-medium">主营产品</p>
                            <p className="font-semibold">{customer.product}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground font-medium">年进口量</p>
                            <p className="font-semibold text-green-600">${customer.importVolume.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-muted-foreground font-medium">联系方式</p>
                            <p className="font-semibold text-blue-600">{customer.contactInfo}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 font-medium">
                            <AlertCircle className="h-4 w-4 inline mr-2" />
                            最新商业动态: {customer.recentActivity}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-6">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          onClick={() => handleViewCustomerDetail(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          查看详情
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all"
                          onClick={() => handleContactCustomer(customer)}
                          disabled={isLoading}
                        >
                          {isLoading ? '发送中...' : '联系客户'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 分析报告标签页 */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="h-5 w-5 text-purple-600" />
                </div>
                智能分析报告中心
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {reports.filter(r => r.status === 'completed').length} 个可用报告
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {reports.map((report, index) => (
                  <div key={report.id} className={`p-6 border-b last:border-b-0 transition-all duration-200 group ${
                    report.status === 'generating' 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100' 
                      : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50/50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            report.status === 'generating'
                              ? 'bg-gradient-to-br from-orange-100 to-yellow-200'
                              : 'bg-gradient-to-br from-purple-100 to-purple-200'
                          }`}>
                            {report.status === 'generating' ? (
                              <RefreshCw className="h-5 w-5 text-orange-600 animate-spin" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                          </div>
                        </div>

                        {report.status === 'generating' && (
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-orange-800">生成进度</span>
                              <span className="text-sm text-orange-600">65%</span>
                            </div>
                            <Progress value={65} className="h-3 bg-orange-100" />
                          </div>
                        )}

                        {report.date && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>生成完成: {report.date}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-6">
                        {report.status === 'completed' ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="hover:bg-purple-50 hover:border-purple-300 transition-colors"
                              onClick={() => handlePreviewReport(report)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              预览报告
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              下载完整版
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" disabled className="opacity-60">
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            生成中...
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 监控设置标签页 */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 自动同步设置 */}
            <Card>
              <CardHeader>
                <CardTitle>自动同步设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">启用自动数据同步</p>
                    <p className="text-sm text-muted-foreground">每日自动获取最新海关数据</p>
                  </div>
                  <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">同步频率</label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">每小时</SelectItem>
                      <SelectItem value="daily">每日</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">数据保留期限</label>
                  <Select defaultValue="1year">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3个月</SelectItem>
                      <SelectItem value="6months">6个月</SelectItem>
                      <SelectItem value="1year">1年</SelectItem>
                      <SelectItem value="unlimited">无限制</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 监控范围设置 */}
            <Card>
              <CardHeader>
                <CardTitle>监控范围设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">监控国家/地区</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedCountries.map((country, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {country}
                        <Trash2 className="h-3 w-3 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="添加国家..." className="flex-1" />
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">产品类别</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProducts.map((product, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {product}
                        <Trash2 className="h-3 w-3 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="添加产品类别..." className="flex-1" />
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 客户匹配设置 */}
          <Card>
            <CardHeader>
              <CardTitle>客户匹配设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">最低匹配分数</label>
                  <Select defaultValue="80">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60分</SelectItem>
                      <SelectItem value="70">70分</SelectItem>
                      <SelectItem value="80">80分</SelectItem>
                      <SelectItem value="90">90分</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">客户规模过滤</label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有规模</SelectItem>
                      <SelectItem value="small">小型企业</SelectItem>
                      <SelectItem value="medium">中型企业</SelectItem>
                      <SelectItem value="large">大型企业</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动添加到客户库</p>
                  <p className="text-sm text-muted-foreground">高匹配度客户自动加入客户管理系统</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 对话框组件 */}
      <CustomerDetailDialog
        open={customerDialogOpen}
        customer={selectedCustomer}
        onClose={() => setCustomerDialogOpen(false)}
      />
      
      <ReportPreviewDialog
        open={reportDialogOpen}
        report={selectedReport}
        onClose={() => setReportDialogOpen(false)}
      />
    </div>
  );
};

export default CustomsAnalysisPage;