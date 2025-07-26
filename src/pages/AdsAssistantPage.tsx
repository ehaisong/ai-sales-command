import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileSpreadsheet, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  Users, 
  Eye,
  BarChart3,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AdData {
  campaign: string;
  adSet: string;
  adName: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpm: number;
  cpc: number;
  roas: number;
}

interface AnalysisReport {
  overview: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    avgCTR: number;
    avgCPM: number;
    avgCPC: number;
    avgROAS: number;
  };
  topPerformers: AdData[];
  underPerformers: AdData[];
  recommendations: string[];
}

const AdsAssistantPage = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) {
        setSelectedFile(file);
        toast({
          title: "文件已选择",
          description: `已选择文件: ${file.name}`,
        });
      } else {
        toast({
          title: "文件格式错误",
          description: "请选择CSV或Excel文件",
          variant: "destructive",
        });
      }
    }
  };

  const simulateAnalysis = (): AnalysisReport => {
    return {
      overview: {
        totalSpend: 15847.32,
        totalImpressions: 2458691,
        totalClicks: 34512,
        totalConversions: 1247,
        avgCTR: 1.4,
        avgCPM: 6.45,
        avgCPC: 0.46,
        avgROAS: 4.2
      },
      topPerformers: [
        {
          campaign: "春季新品推广",
          adSet: "25-35岁女性",
          adName: "春装新品-横版视频",
          impressions: 145623,
          clicks: 3247,
          spend: 1247.85,
          conversions: 89,
          ctr: 2.23,
          cpm: 8.57,
          cpc: 0.38,
          roas: 6.8
        },
        {
          campaign: "母亲节促销",
          adSet: "30-45岁女性",
          adName: "母亲节礼品-图片轮播",
          impressions: 98754,
          clicks: 2156,
          spend: 892.34,
          conversions: 67,
          ctr: 2.18,
          cpm: 9.04,
          cpc: 0.41,
          roas: 5.9
        }
      ],
      underPerformers: [
        {
          campaign: "夏季清仓",
          adSet: "18-25岁男性",
          adName: "清仓大甩卖-单图",
          impressions: 234567,
          clicks: 1234,
          spend: 1567.89,
          conversions: 12,
          ctr: 0.53,
          cpm: 6.68,
          cpc: 1.27,
          roas: 0.8
        }
      ],
      recommendations: [
        "建议暂停ROAS低于2.0的广告组，重新分配预算到高ROAS广告",
        "春季新品推广表现优异，建议增加30%预算",
        "优化夏季清仓广告的目标受众，考虑更换创意素材",
        "CTR低于1%的广告建议更换广告创意",
        "建议测试更多视频广告格式，当前视频广告ROAS表现更好"
      ]
    };
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "请选择文件",
        description: "请先选择要上传的Facebook广告数据文件",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // 模拟文件上传进度
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setIsAnalyzing(true);
          
          // 模拟数据分析
          setTimeout(() => {
            const report = simulateAnalysis();
            setAnalysisReport(report);
            setIsAnalyzing(false);
            toast({
              title: "分析完成",
              description: "广告数据分析报告已生成",
            });
          }, 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadReport = () => {
    toast({
      title: "下载开始",
      description: "广告分析报告正在下载...",
    });
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">广告助手</h1>
          <p className="text-muted-foreground mt-2">上传Facebook广告数据，获取智能分析报告</p>
        </div>
      </div>

      {/* 文件上传区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            上传广告数据
          </CardTitle>
          <CardDescription>
            支持CSV和Excel格式的Facebook广告数据导出文件
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">拖拽文件到此处或点击选择文件</p>
              <p className="text-sm text-muted-foreground">支持 .csv, .xlsx 格式</p>
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline" className="mt-4">
                选择文件
              </Button>
            </label>
          </div>
          
          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="font-medium">{selectedFile.name}</span>
                <Badge variant="secondary">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</Badge>
              </div>
              <Button 
                onClick={() => setSelectedFile(null)} 
                variant="ghost" 
                size="sm"
              >
                移除
              </Button>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>上传进度</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">正在分析数据...</p>
            </div>
          )}

          <Button 
            onClick={handleUploadAndAnalyze} 
            disabled={!selectedFile || isUploading || isAnalyzing}
            className="w-full"
          >
            {isUploading ? '上传中...' : isAnalyzing ? '分析中...' : '上传并分析'}
          </Button>
        </CardContent>
      </Card>

      {/* 分析报告 */}
      {analysisReport && (
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">数据概览</TabsTrigger>
              <TabsTrigger value="performance">效果分析</TabsTrigger>
              <TabsTrigger value="recommendations">优化建议</TabsTrigger>
            </TabsList>
            <Button onClick={downloadReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              下载报告
            </Button>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总花费</p>
                      <p className="text-2xl font-bold">{formatCurrency(analysisReport.overview.totalSpend)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总展示量</p>
                      <p className="text-2xl font-bold">{formatNumber(analysisReport.overview.totalImpressions)}</p>
                    </div>
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总点击量</p>
                      <p className="text-2xl font-bold">{formatNumber(analysisReport.overview.totalClicks)}</p>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总转化量</p>
                      <p className="text-2xl font-bold">{formatNumber(analysisReport.overview.totalConversions)}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">平均CTR</p>
                  <p className="text-xl font-bold">{analysisReport.overview.avgCTR}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">平均CPM</p>
                  <p className="text-xl font-bold">{formatCurrency(analysisReport.overview.avgCPM)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">平均CPC</p>
                  <p className="text-xl font-bold">{formatCurrency(analysisReport.overview.avgCPC)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">平均ROAS</p>
                  <p className="text-xl font-bold text-green-600">{analysisReport.overview.avgROAS}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    表现优秀广告
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisReport.topPerformers.map((ad, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{ad.adName}</h4>
                          <p className="text-sm text-muted-foreground">{ad.campaign}</p>
                        </div>
                        <Badge variant="secondary" className="text-green-600">
                          ROAS {ad.roas}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">花费</p>
                          <p className="font-medium">{formatCurrency(ad.spend)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">点击率</p>
                          <p className="font-medium">{ad.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">转化</p>
                          <p className="font-medium">{ad.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    需要优化广告
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisReport.underPerformers.map((ad, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{ad.adName}</h4>
                          <p className="text-sm text-muted-foreground">{ad.campaign}</p>
                        </div>
                        <Badge variant="destructive">
                          ROAS {ad.roas}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">花费</p>
                          <p className="font-medium">{formatCurrency(ad.spend)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">点击率</p>
                          <p className="font-medium">{ad.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">转化</p>
                          <p className="font-medium">{ad.conversions}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  智能优化建议
                </CardTitle>
                <CardDescription>
                  基于数据分析为您提供的广告优化建议
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisReport.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  重要提醒
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    建议每周定期上传广告数据进行分析，以便及时发现问题并优化投放策略。
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    测试不同的广告创意和受众定位，通过A/B测试找到最佳投放组合。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdsAssistantPage;