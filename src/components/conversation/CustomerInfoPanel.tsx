
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  MessageSquare,
  TrendingUp,
  Star,
  Clock,
  Tag,
  Users,
  Zap
} from 'lucide-react';
import { UnifiedConversation } from '@/types/conversation';

interface CustomerInfoPanelProps {
  conversation: UnifiedConversation | null;
}

const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({ conversation }) => {
  if (!conversation) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">选择对话查看客户信息</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock customer data - in real app this would come from API
  const customerData = {
    name: conversation.customerName,
    email: conversation.customerEmail,
    phone: conversation.customerPhone,
    company: 'ABC Manufacturing Corp',
    position: '采购经理',
    location: '美国纽约',
    website: 'https://abc-manufacturing.com',
    lastContact: '2024-01-10',
    totalOrders: 15,
    totalValue: '$125,000',
    responseRate: '92%',
    avgResponseTime: '2小时'
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-4">
      {/* Customer Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5" />
            客户资料
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
              {getInitials(customerData.name)}
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{customerData.name}</h3>
              <p className="text-sm text-gray-600">{customerData.position}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {conversation.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span>{customerData.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{customerData.email}</span>
            </div>
            {customerData.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{customerData.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{customerData.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-blue-600 hover:underline cursor-pointer">
                {customerData.website}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>上次联系: {customerData.lastContact}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            对话统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{conversation.totalMessages}</div>
              <div className="text-xs text-gray-500">总消息数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{customerData.responseRate}</div>
              <div className="text-xs text-gray-500">回复率</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{customerData.avgResponseTime}</div>
              <div className="text-xs text-gray-500">平均响应</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{conversation.channels.length}</div>
              <div className="text-xs text-gray-500">沟通渠道</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Star className="mr-2 h-5 w-5" />
            业务统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold">{customerData.totalOrders}</div>
              <div className="text-xs text-gray-500">总订单数</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{customerData.totalValue}</div>
              <div className="text-xs text-gray-500">总交易额</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            快捷操作
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Phone className="mr-2 h-4 w-4" />
            发起通话
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            安排会议
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Tag className="mr-2 h-4 w-4" />
            添加标签
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            查看历史
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerInfoPanel;
