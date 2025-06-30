
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, TrendingUp, AlertTriangle, Users, DollarSign, 
  Timer, Target, Zap, Brain, Activity 
} from 'lucide-react';

interface StarCommandCenterProps {
  isFullscreen?: boolean;
}

const StarCommandCenter: React.FC<StarCommandCenterProps> = ({ isFullscreen = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pressureIndex, setPressureIndex] = useState(68);
  const [decisionCountdown, setDecisionCountdown] = useState(143);
  const [roiPrediction, setRoiPrediction] = useState('+24.5%');
  const [crisisLevel, setCrisisLevel] = useState('normal');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setDecisionCountdown(prev => Math.max(0, prev - 1));
      
      // 模拟动态数据更新
      if (Math.random() > 0.8) {
        setPressureIndex(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getPressureColor = (pressure: number) => {
    if (pressure > 80) return 'text-red-400';
    if (pressure > 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className={`${isFullscreen ? 'h-full' : 'h-[800px]'} bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden`}>
      {/* 星空背景效果 */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      {/* 流动光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" />

      <div className="relative z-10 p-6 h-full">
        {/* 顶部状态栏 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">STAR COMMAND CENTER</h1>
            </div>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400">
              EXECUTIVE MODE
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-white font-mono text-lg">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
            <div className="text-blue-300 text-sm">
              {currentTime.toLocaleDateString('zh-CN')}
            </div>
          </div>
        </div>

        {/* 主控制面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* 压力指数仪表盘 */}
          <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-blue-300 font-semibold">压力指数</h3>
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div className="relative">
                <div className="text-3xl font-mono font-bold">
                  <span className={getPressureColor(pressureIndex)}>{pressureIndex}</span>
                  <span className="text-gray-400 text-lg">%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      pressureIndex > 80 ? 'bg-red-500' : 
                      pressureIndex > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${pressureIndex}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 决策倒计时 */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-purple-300 font-semibold">决策倒计时</h3>
                <Timer className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-purple-400">
                {Math.floor(decisionCountdown / 60)}:{(decisionCountdown % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-400">重要决策截止时间</div>
            </CardContent>
          </Card>

          {/* ROI预测光束 */}
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-green-300 font-semibold">ROI预测</h3>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-green-400">
                {roiPrediction}
              </div>
              <div className="text-sm text-gray-400">下季度预测增长</div>
            </CardContent>
          </Card>

          {/* 危机预警 */}
          <Card className="bg-black/40 border-red-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-red-300 font-semibold">危机预警</h3>
                <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
              </div>
              <div className="text-lg font-bold text-green-400">
                系统正常
              </div>
              <div className="text-sm text-gray-400">所有系统运行正常</div>
            </CardContent>
          </Card>
        </div>

        {/* 3D全息客户分析面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 客户星云图 */}
          <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-300 font-semibold text-lg">客户星云分布</h3>
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div className="relative h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg overflow-hidden">
                {/* 模拟3D客户节点 */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-blue-400 rounded-full animate-pulse cursor-pointer hover:scale-150 transition-transform"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    title={`客户节点 ${i + 1}`}
                  />
                ))}
                {/* 连接线 */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={i}
                      x1={`${30 + Math.random() * 40}%`}
                      y1={`${30 + Math.random() * 40}%`}
                      x2={`${30 + Math.random() * 40}%`}
                      y2={`${30 + Math.random() * 40}%`}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-blue-300">高价值客户: 156</span>
                <span className="text-purple-300">潜在客户: 284</span>
              </div>
            </CardContent>
          </Card>

          {/* 实时任务控制台 */}
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-300 font-semibold text-lg">任务控制台</h3>
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div className="space-y-3">
                {[
                  { task: '处理高优先级客户投诉', priority: 'high', progress: 85 },
                  { task: '季度销售报告生成', priority: 'medium', progress: 60 },
                  { task: '新客户跟进计划', priority: 'low', progress: 30 }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm">{item.task}</span>
                      <Badge 
                        variant="outline"
                        className={
                          item.priority === 'high' ? 'border-red-500 text-red-400' :
                          item.priority === 'medium' ? 'border-yellow-500 text-yellow-400' :
                          'border-green-500 text-green-400'
                        }
                      >
                        {item.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                启动AI自动处理
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StarCommandCenter;
