import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import TrafficHistorySection from "@/components/traffic-heating/TrafficHistorySection";
import { TrafficHeatingRecord } from "@/types/trafficHeating";
import { Globe, TrendingUp, CreditCard, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

// Mock data for demonstration
const mockUserPoints = 2580;

const mockHistoryRecords: TrafficHeatingRecord[] = [
  {
    id: "1",
    websiteUrl: "https://example.com",
    websiteTitle: "示例网站",
    dailyTraffic: 1000,
    durationDays: 7,
    pointsDeducted: 665,
    startTime: "2024-01-10",
    endTime: "2024-01-17",
    status: "running",
    remainingDays: 3,
    createdAt: "2024-01-10"
  },
  {
    id: "2",
    websiteUrl: "https://demo.com",
    websiteTitle: "演示站点",
    dailyTraffic: 500,
    durationDays: 3,
    pointsDeducted: 150,
    startTime: "2024-01-05",
    endTime: "2024-01-08",
    status: "completed",
    createdAt: "2024-01-05"
  }
];

const TrafficHeatingPage = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [dailyTraffic, setDailyTraffic] = useState(100);
  const [durationDays, setDurationDays] = useState(1);
  const [historyRecords, setHistoryRecords] = useState<TrafficHeatingRecord[]>(mockHistoryRecords);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = (inputUrl: string) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(inputUrl);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setWebsiteUrl(newUrl);
    
    if (newUrl) {
      setIsValidating(true);
      setTimeout(() => {
        setIsValid(validateUrl(newUrl));
        setIsValidating(false);
      }, 500);
    } else {
      setIsValid(null);
    }
  };

  const getValidationIcon = () => {
    if (isValidating) return null;
    if (isValid === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (isValid === false) return <AlertCircle className="w-5 h-5 text-red-500" />;
    return null;
  };

  // 计费规则: 100访问量/天 = 10积分
  const calculateDailyPoints = (traffic: number) => {
    let basePoints = (traffic / 100) * 10;
    
    // 批量优惠
    if (traffic >= 5000) basePoints *= 0.8;
    else if (traffic >= 1000) basePoints *= 0.9;
    
    return Math.ceil(basePoints);
  };

  const calculateTotalPoints = (traffic: number, duration: number) => {
    let dailyPoints = calculateDailyPoints(traffic);
    let totalPoints = dailyPoints * duration;
    
    // 时长优惠
    if (duration >= 30) totalPoints *= 0.9;
    else if (duration >= 7) totalPoints *= 0.95;
    
    return Math.ceil(totalPoints);
  };

  const dailyPoints = calculateDailyPoints(dailyTraffic);
  const totalPoints = calculateTotalPoints(dailyTraffic, durationDays);
  const isPointsSufficient = mockUserPoints >= totalPoints;

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

  const handleStartHeating = () => {
    if (!websiteUrl) {
      toast({
        title: "请输入网址",
        description: "请先输入需要加热的网址",
        variant: "destructive"
      });
      return;
    }

    console.log("开始流量加热:", {
      websiteUrl,
      dailyTraffic,
      durationDays
    });

    toast({
      title: "流量加热已启动",
      description: `正在为 ${websiteUrl} 启动流量加热服务`,
    });

    // Mock: 添加新记录到历史列表
    const newRecord: TrafficHeatingRecord = {
      id: Date.now().toString(),
      websiteUrl,
      dailyTraffic,
      durationDays,
      pointsDeducted: totalPoints,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString(),
      status: "running",
      remainingDays: durationDays,
      createdAt: new Date().toISOString()
    };

    setHistoryRecords(prev => [newRecord, ...prev]);
    
    // 重置表单
    setWebsiteUrl("");
    setDailyTraffic(100);
    setDurationDays(1);
  };

  const handleRecharge = () => {
    console.log("跳转到充值页面");
    toast({
      title: "跳转充值",
      description: "正在跳转到积分充值页面...",
    });
  };

  const handlePause = (id: string) => {
    setHistoryRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: 'paused' as const } : record
    ));
    toast({
      title: "已暂停流量加热",
      description: "流量加热服务已暂停",
    });
  };

  const handleResume = (id: string) => {
    setHistoryRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: 'running' as const } : record
    ));
    toast({
      title: "已恢复流量加热",
      description: "流量加热服务已恢复",
    });
  };

  const handleStop = (id: string) => {
    setHistoryRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: 'cancelled' as const, remainingDays: 0 } : record
    ));
    toast({
      title: "已停止流量加热",
      description: "流量加热服务已停止",
    });
  };

  const handleRestart = (record: TrafficHeatingRecord) => {
    const pointsForRestart = calculateTotalPoints(record.dailyTraffic, record.durationDays);

    const newRecord: TrafficHeatingRecord = {
      id: Date.now().toString(),
      websiteUrl: record.websiteUrl,
      websiteTitle: record.websiteTitle,
      dailyTraffic: record.dailyTraffic,
      durationDays: record.durationDays,
      pointsDeducted: pointsForRestart,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + record.durationDays * 24 * 60 * 60 * 1000).toISOString(),
      status: "running",
      remainingDays: record.durationDays,
      createdAt: new Date().toISOString()
    };

    setHistoryRecords(prev => [newRecord, ...prev]);
    toast({
      title: "任务已重新开始",
      description: `已为 ${record.websiteUrl} 创建新的流量加热任务`,
    });
  };

  const handleDelete = (id: string) => {
    setHistoryRecords(prev => prev.filter(record => record.id !== id));
    toast({
        title: "记录已删除",
        description: "流量加热记录已成功删除",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">流量加热</h1>
          <p className="text-gray-600">
            智能流量加热服务，提升网站访问量和搜索引擎排名
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：配置区域 - 整合到一个卡片 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  流量加热配置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 目标网址 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Globe className="w-4 h-4" />
                    目标网址
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website-url">请输入需要加热的网址</Label>
                    <div className="relative">
                      <Input
                        id="website-url"
                        type="url"
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={handleUrlChange}
                        className="pr-10"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getValidationIcon()}
                      </div>
                    </div>
                    {isValid === false && (
                      <p className="text-sm text-red-500">
                        请输入有效的网址格式
                      </p>
                    )}
                  </div>
                  
                  {isValid && websiteUrl && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">网站验证成功</p>
                        <p className="text-xs text-gray-500">{websiteUrl}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 流量参数设置 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <TrendingUp className="w-4 h-4" />
                    流量参数设置
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>每日引入流量</Label>
                      <Select 
                        value={dailyTraffic.toString()} 
                        onValueChange={(value) => setDailyTraffic(parseInt(value))}
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
                        onValueChange={(value) => setDurationDays(parseInt(value))}
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
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">预期效果</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• 总计流量: {(dailyTraffic * durationDays).toLocaleString()} 次访问</p>
                      <p>• 平均每小时: {Math.round(dailyTraffic / 24)} 次访问</p>
                      <p>• 流量分布: 自然分布，避免异常检测</p>
                    </div>
                  </div>
                </div>

                {/* 积分计算 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <CreditCard className="w-4 h-4" />
                    积分计算
                  </div>
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
                        当前可用积分: {mockUserPoints.toLocaleString()}
                        {!isPointsSufficient && ` (还需 ${totalPoints - mockUserPoints} 积分)`}
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
                        onClick={handleStartHeating} 
                        className="flex-1"
                        disabled={!dailyTraffic || !durationDays}
                      >
                        开始流量加热
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={handleRecharge} 
                          variant="outline" 
                          className="flex-1"
                        >
                          充值积分
                        </Button>
                        <Button 
                          onClick={handleStartHeating} 
                          className="flex-1" 
                          disabled
                        >
                          积分不足
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 右侧：历史记录 */}
          <div>
            <TrafficHistorySection
              records={historyRecords}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
              onRestart={handleRestart}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficHeatingPage;
