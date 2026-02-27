import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, TrendingUp, Zap, ArrowUp, ArrowDown, Calendar, Download,
  BarChart3, Mail, Globe, Users, Search, Eye, Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock usage data over months
const usageChartData = [
  { month: '2025-01', used: 1200, recharged: 5000 },
  { month: '2025-02', used: 1800, recharged: 0 },
  { month: '2025-03', used: 2100, recharged: 5000 },
  { month: '2025-04', used: 1500, recharged: 0 },
  { month: '2025-05', used: 2400, recharged: 0 },
  { month: '2025-06', used: 1900, recharged: 5000 },
  { month: '2025-07', used: 2800, recharged: 0 },
  { month: '2025-08', used: 2200, recharged: 0 },
  { month: '2025-09', used: 3100, recharged: 10000 },
  { month: '2025-10', used: 2600, recharged: 0 },
  { month: '2025-11', used: 3400, recharged: 5000 },
  { month: '2025-12', used: 1800, recharged: 0 },
];

const categoryData = [
  { name: 'AI客户分析', value: 8500, color: '#6C6CFF' },
  { name: '邮件营销', value: 4200, color: '#10B981' },
  { name: '流量加热', value: 3800, color: '#F59E0B' },
  { name: '竞品监控', value: 2600, color: '#EF4444' },
  { name: '海关数据', value: 3200, color: '#8B5CF6' },
  { name: 'SEO优化', value: 2400, color: '#EC4899' },
];

// Mock transaction records
const mockTransactions = [
  { id: '1', type: 'recharge', amount: 5000, price: 399, description: '专业版套餐充值', date: '2025-11-15 14:30', status: 'completed' },
  { id: '2', type: 'consume', amount: -150, description: 'AI客户分析 - 15次', date: '2025-11-14 10:22', status: 'completed', category: 'ai-analysis' },
  { id: '3', type: 'consume', amount: -50, description: '邮件营销 - 10封邮件', date: '2025-11-13 16:45', status: 'completed', category: 'email' },
  { id: '4', type: 'consume', amount: -665, description: '流量加热 - example.com 7天', date: '2025-11-12 09:15', status: 'completed', category: 'traffic' },
  { id: '5', type: 'consume', amount: -100, description: '海关数据查询 - 美国电子产品', date: '2025-11-11 11:30', status: 'completed', category: 'customs' },
  { id: '6', type: 'recharge', amount: 10000, price: 1299, description: '企业版套餐充值', date: '2025-09-20 08:00', status: 'completed' },
  { id: '7', type: 'consume', amount: -200, description: '竞品监控 - 10天', date: '2025-11-10 14:00', status: 'completed', category: 'competitor' },
  { id: '8', type: 'consume', amount: -90, description: 'SEO优化 - 3个页面', date: '2025-11-09 17:20', status: 'completed', category: 'seo' },
  { id: '9', type: 'bonus', amount: 1000, description: '专业版额外赠送积分', date: '2025-11-15 14:30', status: 'completed' },
  { id: '10', type: 'consume', amount: -30, description: '邮件营销 - 6封邮件', date: '2025-11-08 13:10', status: 'completed', category: 'email' },
  { id: '11', type: 'consume', amount: -300, description: 'AI客户分析 - 30次批量分析', date: '2025-11-07 09:45', status: 'completed', category: 'ai-analysis' },
  { id: '12', type: 'recharge', amount: 5000, price: 399, description: '专业版套餐充值', date: '2025-06-10 11:00', status: 'completed' },
];

const CreditsManagementPage = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');

  const totalCredits = 24700;
  const usedCredits = 18220;
  const remainingCredits = totalCredits - usedCredits;
  const usagePercent = Math.round((usedCredits / totalCredits) * 100);

  const filteredTransactions = filterType === 'all'
    ? mockTransactions
    : mockTransactions.filter(t => t.type === filterType);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'ai-analysis': return <Sparkles className="w-4 h-4 text-primary" />;
      case 'email': return <Mail className="w-4 h-4 text-green-500" />;
      case 'traffic': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'competitor': return <Eye className="w-4 h-4 text-red-500" />;
      case 'customs': return <Globe className="w-4 h-4 text-purple-500" />;
      case 'seo': return <Search className="w-4 h-4 text-pink-500" />;
      default: return <CreditCard className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">积分管理</h1>
          <p className="page-subtitle">管理您的积分余额和使用记录</p>
        </div>
        <Button
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 monday-button"
          onClick={() => navigate('/credits/recharge')}
        >
          <CreditCard className="w-4 h-4 mr-2" /> 充值积分
        </Button>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="monday-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">当前余额</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{remainingCredits.toLocaleString()}</div>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> 较上月增长 12%
            </p>
          </CardContent>
        </Card>
        <Card className="monday-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground">总充值</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{totalCredits.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">累计充值 ¥2,496</p>
          </CardContent>
        </Card>
        <Card className="monday-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-muted-foreground">已使用</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{usedCredits.toLocaleString()}</div>
            <Progress value={usagePercent} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">已使用 {usagePercent}%</p>
          </CardContent>
        </Card>
        <Card className="monday-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-muted-foreground">本月消耗</span>
            </div>
            <div className="text-3xl font-bold text-foreground">1,585</div>
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <ArrowDown className="w-3 h-3" /> 较上月减少 8%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 使用趋势图 */}
        <Card className="lg:col-span-2 monday-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> 积分使用趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={usageChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="used" stackId="1" stroke="hsl(240,100%,70%)" fill="hsl(240,100%,70%,0.3)" name="消耗积分" />
                <Area type="monotone" dataKey="recharged" stackId="2" stroke="hsl(145,63%,49%)" fill="hsl(145,63%,49%,0.2)" name="充值积分" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 使用分布饼图 */}
        <Card className="monday-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> 消耗分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryData.map((cat, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                  </div>
                  <span className="font-medium">{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 交易记录 */}
      <Card className="monday-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>交易记录</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="recharge">充值</SelectItem>
                  <SelectItem value="consume">消耗</SelectItem>
                  <SelectItem value="bonus">赠送</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" /> 导出
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'recharge' ? 'bg-green-100' : tx.type === 'bonus' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {tx.type === 'recharge' ? <ArrowUp className="w-4 h-4 text-green-600" /> :
                     tx.type === 'bonus' ? <Sparkles className="w-4 h-4 text-blue-600" /> :
                     getCategoryIcon((tx as any).category)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} 积分
                  </p>
                  {tx.price && <p className="text-xs text-muted-foreground">¥{tx.price}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsManagementPage;
