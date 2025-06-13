
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Building, MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react';

interface CustomerInfoPanelProps {
  email?: string;
}

const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({ email }) => {
  // 模拟客户数据
  const customerData = {
    name: 'John Smith',
    email: email || 'john.smith@example.com',
    company: 'ABC Manufacturing Corp',
    position: '采购经理',
    phone: '+1-555-0123',
    location: '美国纽约',
    website: 'https://abc-manufacturing.com',
    lastContact: '2024-01-10',
    tags: ['重要客户', '制造业', '长期合作'],
    totalOrders: 15,
    totalValue: '$125,000'
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">客户资料</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 基本信息 */}
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
            {getInitials(customerData.name)}
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{customerData.name}</h3>
            <p className="text-sm text-muted-foreground">{customerData.position}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {customerData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.company}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-blue-600 hover:underline cursor-pointer">
              {customerData.website}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>上次联系: {customerData.lastContact}</span>
          </div>
        </div>

        {/* 业务统计 */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold">{customerData.totalOrders}</div>
              <div className="text-xs text-muted-foreground">总订单数</div>
            </div>
            <div>
              <div className="text-lg font-semibold">{customerData.totalValue}</div>
              <div className="text-xs text-muted-foreground">总交易额</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoPanel;
