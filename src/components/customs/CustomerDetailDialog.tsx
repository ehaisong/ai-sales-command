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
import { 
  Globe, 
  Package, 
  TrendingUp, 
  Mail, 
  Calendar,
  Building,
  BarChart3,
  Target
} from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  country: string;
  product: string;
  importVolume: number;
  matchScore: number;
  contactInfo: string;
  recentActivity: string;
}

interface CustomerDetailDialogProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
}

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({ 
  open, 
  customer, 
  onClose 
}) => {
  if (!customer) return null;

  const mockDetailData = {
    establishedYear: '2018',
    employees: '150-500',
    annualRevenue: '$50M - $100M',
    mainProducts: ['电子设备', '智能硬件', '消费电子'],
    importHistory: [
      { year: '2023', volume: 180000, growth: '+15%' },
      { year: '2022', volume: 156000, growth: '+8%' },
      { year: '2021', volume: 144000, growth: '+12%' }
    ],
    supplierRegions: ['中国 (45%)', '韩国 (25%)', '日本 (20%)', '其他 (10%)'],
    riskLevel: 'low'
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            {customer.name}
          </DialogTitle>
          <DialogDescription>
            详细客户信息与商业分析报告
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本信息卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">地理信息</span>
              </div>
              <p className="text-lg font-semibold">{customer.country}</p>
              <p className="text-sm text-muted-foreground">主要业务区域</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">匹配评分</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{customer.matchScore}%</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {customer.matchScore >= 90 ? '极高' : customer.matchScore >= 80 ? '高' : '中等'}
                </Badge>
              </div>
            </div>
          </div>

          {/* 公司概览 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">公司概览</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">成立年份</p>
                <p className="font-semibold">{mockDetailData.establishedYear}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Building className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">员工规模</p>
                <p className="font-semibold">{mockDetailData.employees}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <BarChart3 className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">年营收</p>
                <p className="font-semibold">{mockDetailData.annualRevenue}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">风险等级</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {mockDetailData.riskLevel === 'low' ? '低风险' : '中风险'}
                </Badge>
              </div>
            </div>
          </div>

          {/* 产品信息 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5" />
              主营产品
            </h3>
            <div className="flex flex-wrap gap-2">
              {mockDetailData.mainProducts.map((product, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {product}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* 进口历史 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">进口历史趋势</h3>
            <div className="space-y-2">
              {mockDetailData.importHistory.map((record, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">{record.year}年</span>
                  <div className="text-right">
                    <p className="font-semibold">${record.volume.toLocaleString()}</p>
                    <p className={`text-sm ${record.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {record.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 供应商分布 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">供应商区域分布</h3>
            <div className="grid grid-cols-2 gap-2">
              {mockDetailData.supplierRegions.map((region, index) => (
                <div key={index} className="flex justify-between p-2 bg-muted/30 rounded">
                  <span>{region}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最新动态 */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">最新商业动态</h4>
            <p className="text-blue-800">{customer.recentActivity}</p>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              发送邮件
            </Button>
            <Button>
              加入客户库
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;