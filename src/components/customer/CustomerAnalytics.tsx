
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

  // Data source distribution
  const sourceData = customers.reduce((acc, customer) => {
    acc[customer.dataSource] = (acc[customer.dataSource] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(sourceData).map(([source, count]) => ({
    name: source,
    value: count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Stats Cards */}
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-9 w-9 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold font-din">{totalCustomers}</p>
              <p className="text-sm text-muted-foreground">总客户数</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Building2 className="h-9 w-9 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold font-din">{companyCustomers}</p>
              <p className="text-sm text-muted-foreground">企业客户</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <Target className="h-9 w-9 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold font-din">{individualCustomers}</p>
              <p className="text-sm text-muted-foreground">个人客户</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-orange-100 rounded-full">
              <TrendingUp className="h-9 w-9 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold font-din">{avgScore}</p>
              <p className="text-sm text-muted-foreground">平均评分</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalytics;
