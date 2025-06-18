import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Search, Filter, Clock, CheckCircle2, Loader2, AlertCircle, Linkedin, Mail, Instagram, Database, Grid3x3 } from 'lucide-react';

interface HistoryItem {
  id: string;
  text: string;
  category: string;
  status: 'completed' | 'in-progress' | 'failed';
  timestamp: Date;
  duration?: number;
  details?: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  color: string;
}

const historyData: HistoryItem[] = [
  {
    id: '1',
    text: '分析LinkedIn平台潜在客户',
    category: 'linkedin',
    status: 'completed',
    timestamp: new Date(Date.now() - 3600000),
    duration: 45,
    details: '发现128个潜在客户，其中32个高质量目标',
    icon: Linkedin,
    color: '#0A66C2'
  },
  {
    id: '2',
    text: '发送个性化邮件给目标客户',
    category: 'email',
    status: 'completed',
    timestamp: new Date(Date.now() - 7200000),
    duration: 23,
    details: '成功发送15封邮件，回复率预期35%',
    icon: Mail,
    color: '#10B981'
  },
  {
    id: '3',
    text: '更新Instagram品牌内容',
    category: 'instagram',
    status: 'in-progress',
    timestamp: new Date(Date.now() - 1800000),
    details: '正在生成3条品牌推广内容',
    icon: Instagram,
    color: '#E4405F'
  },
  {
    id: '4',
    text: '客户数据分析和分类',
    category: 'data',
    status: 'completed',
    timestamp: new Date(Date.now() - 10800000),
    duration: 67,
    details: '处理了245条客户记录，完成精准分类',
    icon: Database,
    color: '#6366F1'
  },
  {
    id: '5',
    text: '跟进客户回复邮件',
    category: 'email',
    status: 'failed',
    timestamp: new Date(Date.now() - 14400000),
    details: '由于网络问题导致部分邮件发送失败',
    icon: Mail,
    color: '#EF4444'
  }
];

interface WorkflowHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WorkflowHistoryDialog: React.FC<WorkflowHistoryDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = [
    { value: 'all', label: '全部类型', icon: Grid3x3 },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
    { value: 'email', label: '邮件营销', icon: Mail },
    { value: 'instagram', label: 'Instagram', icon: Instagram },
    { value: 'data', label: '数据分析', icon: Database }
  ];

  const statuses = [
    { value: 'all', label: '全部状态', icon: Filter },
    { value: 'completed', label: '已完成', icon: CheckCircle2 },
    { value: 'in-progress', label: '进行中', icon: Loader2 },
    { value: 'failed', label: '失败', icon: AlertCircle }
  ];

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.details && item.details.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
      failed: 'bg-red-100 text-red-700 border-red-200'
    };
    
    const labels = {
      completed: '已完成',
      'in-progress': '进行中',
      failed: '失败'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} text-xs`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes}分钟`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>AI工作流历史记录</span>
          </DialogTitle>
        </DialogHeader>

        {/* 搜索和筛选区域 */}
        <div className="flex flex-col space-y-4 pb-4 border-b">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索工作流任务..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* 筛选标签区域 */}
          <div className="space-y-3">
            {/* 类型筛选 - 蓝色系，增强悬停效果 */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Filter className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">任务类型</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`text-xs h-8 transition-all duration-200 ${
                        selectedCategory === category.value
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 transform hover:scale-105'
                          : 'border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-800 transform hover:scale-105 hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {/* 状态筛选 - 绿色系，增强悬停效果 */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">执行状态</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {statuses.map(status => {
                  const IconComponent = status.icon;
                  return (
                    <Button
                      key={status.value}
                      variant={selectedStatus === status.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus(status.value)}
                      className={`text-xs h-8 transition-all duration-200 ${
                        selectedStatus === status.value
                          ? 'bg-green-600 hover:bg-green-700 text-white border-green-600 transform hover:scale-105'
                          : 'border-green-200 text-green-700 hover:bg-green-100 hover:border-green-400 hover:text-green-800 transform hover:scale-105 hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="h-3 w-3 mr-1" />
                      {status.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 历史记录列表 */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon className="h-4 w-4" color={item.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.text}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                      
                      {item.details && (
                        <p className="text-xs text-gray-600 mb-2">
                          {item.details}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(item.timestamp)}</span>
                          </div>
                          {item.duration && (
                            <div className="flex items-center space-x-1">
                              <span>耗时: {formatDuration(item.duration)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>没有找到匹配的历史记录</p>
            </div>
          )}
        </ScrollArea>

        {/* 统计信息 */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-green-600">
                {historyData.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-500">已完成</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {historyData.filter(item => item.status === 'in-progress').length}
              </div>
              <div className="text-xs text-gray-500">进行中</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-red-600">
                {historyData.filter(item => item.status === 'failed').length}
              </div>
              <div className="text-xs text-gray-500">失败</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowHistoryDialog;
