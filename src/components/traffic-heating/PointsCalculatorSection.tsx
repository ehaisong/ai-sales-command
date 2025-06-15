
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertTriangle, CheckCircle } from "lucide-react";

interface PointsCalculatorSectionProps {
  dailyTraffic: number;
  durationDays: number;
  userPoints: number;
  onStartHeating: () => void;
  onRecharge: () => void;
}

const PointsCalculatorSection: React.FC<PointsCalculatorSectionProps> = ({
  dailyTraffic,
  durationDays,
  userPoints,
  onStartHeating,
  onRecharge
}) => {
  // 计费规则: 100访问量/天 = 10积分
  const calculateDailyPoints = (traffic: number) => {
    let basePoints = (traffic / 100) * 10;
    
    // 批量优惠
    if (traffic >= 5000) basePoints *= 0.8;
    else if (traffic >= 1000) basePoints *= 0.9;
    
    return Math.ceil(basePoints);
  };

  const calculateTotalPoints = () => {
    let dailyPoints = calculateDailyPoints(dailyTraffic);
    let totalPoints = dailyPoints * durationDays;
    
    // 时长优惠
    if (durationDays >= 30) totalPoints *= 0.9;
    else if (durationDays >= 7) totalPoints *= 0.95;
    
    return Math.ceil(totalPoints);
  };

  const dailyPoints = calculateDailyPoints(dailyTraffic);
  const totalPoints = calculateTotalPoints();
  const isPointsSufficient = userPoints >= totalPoints;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          积分计算
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">每日消耗积分:</span>
            <span className="font-medium">{dailyPoints} 积分</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">加热时长:</span>
            <span className="font-medium">{durationDays} 天</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>总计需要:</span>
              <span className="text-lg">{totalPoints} 积分</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          isPointsSufficient 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {isPointsSufficient ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500" />
          )}
          <div className="flex-1">
            <p className="font-medium">
              {isPointsSufficient ? '积分充足' : '积分不足'}
            </p>
            <p className="text-sm">
              当前可用积分: {userPoints.toLocaleString()}
              {!isPointsSufficient && ` (还需 ${totalPoints - userPoints} 积分)`}
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>• 计费标准: 100访问量/天 = 10积分</p>
          <p>• 1000+访问量享受9折，5000+访问量享受8折</p>
          <p>• 7天+享受95折，30天+享受9折</p>
        </div>

        <div className="flex gap-2">
          {isPointsSufficient ? (
            <Button 
              onClick={onStartHeating} 
              className="flex-1"
              disabled={!dailyTraffic || !durationDays}
            >
              开始流量加热
            </Button>
          ) : (
            <>
              <Button 
                onClick={onRecharge} 
                variant="outline" 
                className="flex-1"
              >
                充值积分
              </Button>
              <Button 
                onClick={onStartHeating} 
                className="flex-1" 
                disabled
              >
                积分不足
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsCalculatorSection;
