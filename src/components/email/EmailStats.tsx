
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Eye, 
  Reply, 
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { EmailStats as EmailStatsType } from '@/types/email';

interface EmailStatsProps {
  stats: EmailStatsType;
}

const EmailStats: React.FC<EmailStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: '总邮件',
      value: stats.total,
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: '已发送',
      value: stats.sent,
      icon: Send,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: '已送达',
      value: stats.delivered,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: '已查看',
      value: stats.opened,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: '已回复',
      value: stats.replied,
      icon: Reply,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      title: '失败',
      value: stats.bounced,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: '待处理',
      value: stats.pending,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const openRate = stats.sent > 0 ? ((stats.opened / stats.sent) * 100).toFixed(1) : '0';
  const replyRate = stats.opened > 0 ? ((stats.replied / stats.opened) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className={`${stat.borderColor} hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">打开率</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-blue-600">{openRate}%</span>
              <Badge variant="secondary" className="text-xs">
                {stats.opened}/{stats.sent}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">邮件打开率表现</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">回复率</CardTitle>
              <Reply className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-green-600">{replyRate}%</span>
              <Badge variant="secondary" className="text-xs">
                {stats.replied}/{stats.opened}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">客户回复转化率</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailStats;
