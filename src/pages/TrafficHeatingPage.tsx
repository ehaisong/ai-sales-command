
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import URLInputSection from "@/components/traffic-heating/URLInputSection";
import TrafficSettingsSection from "@/components/traffic-heating/TrafficSettingsSection";
import PointsCalculatorSection from "@/components/traffic-heating/PointsCalculatorSection";
import TrafficHistorySection from "@/components/traffic-heating/TrafficHistorySection";
import { TrafficHeatingRecord } from "@/types/trafficHeating";

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

  const handleStartHeating = () => {
    if (!websiteUrl) {
      toast({
        title: "请输入网址",
        description: "请先输入需要加热的网址",
        variant: "destructive"
      });
      return;
    }

    // 这里应该调用API创建流量加热任务
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
      pointsDeducted: Math.ceil((dailyTraffic / 100) * 10 * durationDays),
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
          {/* 左侧：配置区域 */}
          <div className="space-y-6">
            <URLInputSection
              url={websiteUrl}
              onUrlChange={setWebsiteUrl}
            />
            
            <TrafficSettingsSection
              dailyTraffic={dailyTraffic}
              durationDays={durationDays}
              onDailyTrafficChange={setDailyTraffic}
              onDurationChange={setDurationDays}
            />
            
            <PointsCalculatorSection
              dailyTraffic={dailyTraffic}
              durationDays={durationDays}
              userPoints={mockUserPoints}
              onStartHeating={handleStartHeating}
              onRecharge={handleRecharge}
            />
          </div>
          
          {/* 右侧：历史记录 */}
          <div>
            <TrafficHistorySection
              records={historyRecords}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficHeatingPage;
