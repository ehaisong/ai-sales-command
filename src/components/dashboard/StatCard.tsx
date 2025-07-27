
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
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  iconColor = '#6b7280',
  bgColor
}) => {
  return (
    <Card className={`card-hover ${bgColor}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-3 w-3" style={{ color: iconColor }} />
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="text-xl font-din font-bold mb-1">{value}</div>
        {trend && (
          <p className={`text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
