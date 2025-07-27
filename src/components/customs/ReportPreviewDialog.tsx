import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  TrendingUp, 
  BarChart3,
  Globe,
  Calendar,
  Download,
  Eye,
  Target
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  date?: string;
  status?: 'completed' | 'generating';
}

interface ReportPreviewDialogProps {
  open: boolean;
  report: Report | null;
  onClose: () => void;
}

const ReportPreviewDialog: React.FC<ReportPreviewDialogProps> = ({ 
  open, 
  report, 
  onClose 
}) => {
  if (!report) return null;

  const mockReportData = {
    executiveSummary: '本月海关数据显示，电子产品贸易继续保持强劲增长势头，同比增长15.8%。美国和德国市场需求旺盛，为中国出口商提供了良好机遇。',
    keyFindings: [
      '电子产品出口额达到1.25亿美元，创历史新高',
      '德国市场汽车配件需求下降8.3%，需要关注',
      '英国服装进口量大幅增长15.8%',
      '发现2,847个高匹配度潜在客户'
    ],
    marketTrends: [
      {
        region: '北美市场',
        trend: 'up',
        change: '+12.5%',
        description: '电子产品需求持续增长，特别是智能设备领域'
      },
      {
        region: '欧洲市场',
        trend: 'mixed',
        change: '+3.2%',
        description: '整体稳定，但汽车配件需求有所下降'
      },
      {
        region: '亚太市场',
        trend: 'up',
        change: '+8.7%',
        description: '新兴市场表现亮眼，贸易额稳步提升'
      }
    ],
    recommendations: [
      '重点关注美国电子产品市场，加强与TechCorp Solutions等公司的合作',
      '德国汽车配件市场需谨慎，建议多元化产品组合',
      '英国服装市场机会较大，可考虑开拓European Fashion Ltd等客户',
      '利用AI匹配技术，优先联系高匹配度客户'
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {report.title}
          </DialogTitle>
          <DialogDescription>
            {report.description}
            {report.date && ` • 生成时间: ${report.date}`}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* 报告状态 */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">报告状态</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Eye className="h-3 w-3 mr-1" />
                {report.status === 'generating' ? '生成中' : '已完成'}
              </Badge>
            </div>

            {/* 执行摘要 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                执行摘要
              </h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-900 leading-relaxed">{mockReportData.executiveSummary}</p>
              </div>
            </div>

            <Separator />

            {/* 关键发现 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                关键发现
              </h3>
              <div className="space-y-2">
                {mockReportData.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 市场趋势 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                市场趋势分析
              </h3>
              <div className="space-y-3">
                {mockReportData.marketTrends.map((trend, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{trend.region}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${
                          trend.trend === 'up' 
                            ? 'text-green-700 border-green-300 bg-green-50' 
                            : trend.trend === 'down'
                            ? 'text-red-700 border-red-300 bg-red-50'
                            : 'text-orange-700 border-orange-300 bg-orange-50'
                        }`}
                      >
                        {trend.change}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 行动建议 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-600" />
                行动建议
              </h3>
              <div className="space-y-2">
                {mockReportData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-orange-700">{index + 1}</span>
                    </div>
                    <p className="text-sm text-orange-900">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 数据可视化预览区域 */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">图表和数据可视化</p>
                <p className="text-xs text-gray-500">完整版本将包含详细的图表分析</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* 操作按钮 */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            预览模式 • 下载完整报告获取所有数据
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              关闭预览
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              下载完整报告
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreviewDialog;