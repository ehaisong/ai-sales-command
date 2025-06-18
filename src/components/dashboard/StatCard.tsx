
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp, iconColor = '#6b7280' }) => {
  return (
    <Card className="card-hover transition-all duration-200 hover:shadow-lg border-l-4" style={{ borderLeftColor: iconColor }}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${iconColor}20` }}>
            <Icon className="h-5 w-5" style={{ color: iconColor }} />
          </div>
          <div className="text-right">
            <div className="text-2xl font-din font-bold text-gray-900">{value}</div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {trend && (
            <p className={`text-xs ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${trendUp ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {trend}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
