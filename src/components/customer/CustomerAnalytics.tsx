
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Customer } from '@/types/customer';
import { TrendingUp, Users, Building2, Target } from 'lucide-react';

interface CustomerAnalyticsProps {
  customers: Customer[];
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ customers }) => {
  const totalCustomers = customers.length;
  const individualCustomers = customers.filter(c => c.type === 'individual').length;
  const companyCustomers = customers.filter(c => c.type === 'company').length;
  const avgScore = Math.round(customers.reduce((sum, c) => sum + c.customerScore, 0) / customers.length);

  const statCards = [
    {
      title: '总客户数',
      value: totalCustomers,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      title: '企业客户',
      value: companyCustomers,
      icon: Building2,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-500',
    },
    {
      title: '个人客户',
      value: individualCustomers,
      icon: Target,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-500',
    },
    {
      title: '平均评分',
      value: avgScore,
      icon: TrendingUp,
      color: 'bg-orange-50 text-orange-600',
      bgColor: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="shadow-sm border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerAnalytics;
