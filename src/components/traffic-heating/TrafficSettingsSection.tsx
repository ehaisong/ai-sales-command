
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";

interface TrafficSettingsSectionProps {
  dailyTraffic: number;
  durationDays: number;
  onDailyTrafficChange: (traffic: number) => void;
  onDurationChange: (days: number) => void;
}

const TrafficSettingsSection: React.FC<TrafficSettingsSectionProps> = ({
  dailyTraffic,
  durationDays,
  onDailyTrafficChange,
  onDurationChange
}) => {
  const trafficOptions = [
    { value: 100, label: "100 访问量/天" },
    { value: 500, label: "500 访问量/天" },
    { value: 1000, label: "1,000 访问量/天" },
    { value: 2000, label: "2,000 访问量/天" },
    { value: 5000, label: "5,000 访问量/天" }
  ];

  const durationOptions = [
    { value: 1, label: "1天" },
    { value: 3, label: "3天" },
    { value: 7, label: "7天" },
    { value: 15, label: "15天" },
    { value: 30, label: "30天" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          流量参数设置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>每日引入流量</Label>
          <Select 
            value={dailyTraffic.toString()} 
            onValueChange={(value) => onDailyTrafficChange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择每日流量" />
            </SelectTrigger>
            <SelectContent>
              {trafficOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>加热时长</Label>
          <Select 
            value={durationDays.toString()} 
            onValueChange={(value) => onDurationChange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择加热时长" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">预期效果</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• 总计流量: {(dailyTraffic * durationDays).toLocaleString()} 次访问</p>
            <p>• 平均每小时: {Math.round(dailyTraffic / 24)} 次访问</p>
            <p>• 流量分布: 自然分布，避免异常检测</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSettingsSection;
