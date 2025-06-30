
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, TreePine, Flower2, Waves, Sun, Cloud, 
  Users, TrendingUp, Heart, Sprout 
} from 'lucide-react';

interface DigitalEcoParkProps {
  isFullscreen?: boolean;
}

const DigitalEcoPark: React.FC<DigitalEcoParkProps> = ({ isFullscreen = false }) => {
  const [ecosystemHealth, setEcosystemHealth] = useState(87);
  const [growthRate, setGrowthRate] = useState(12.3);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(94);

  useEffect(() => {
    const timer = setInterval(() => {
      // 模拟生态系统数据波动
      setEcosystemHealth(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setGrowthRate(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.5));
      setCustomerSatisfaction(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 1)));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${isFullscreen ? 'h-full' : 'h-[800px]'} bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden`}>
      {/* 有机背景效果 */}
      <div className="absolute inset-0">
        {/* 浮动粒子效果 */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* 有机形状背景 */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <radialGradient id="organicGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={`${20 + Math.random() * 60}%`}
              cy={`${20 + Math.random() * 60}%`}
              r={`${50 + Math.random() * 100}`}
              fill="url(#organicGradient)"
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 p-6 h-full">
        {/* 顶部生态状态栏 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Digital Eco-Park
              </h1>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              生态系统健康度: {ecosystemHealth}%
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <Sun className="h-5 w-5" />
              <span>系统状态良好</span>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('zh-CN')}
            </div>
          </div>
        </div>

        {/* 生态指标面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* 生态系统健康度 */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-700 font-semibold">生态健康</h3>
                <Heart className="h-5 w-5 text-green-500 animate-pulse" />
              </div>
              <div className="relative">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {ecosystemHealth.toFixed(0)}%
                </div>
                <div className="w-full bg-green-100 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                    style={{ width: `${ecosystemHealth}%` }}
                  />
                </div>
                <div className="text-sm text-green-600 mt-2">生态系统运行良好</div>
              </div>
            </CardContent>
          </Card>

          {/* 成长速率 */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-emerald-700 font-semibold">成长速率</h3>
                <Sprout className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                +{growthRate.toFixed(1)}%
              </div>
              <div className="text-sm text-emerald-600">月环比增长</div>
            </CardContent>
          </Card>

          {/* 客户满意度 */}
          <Card className="bg-white/80 backdrop-blur-sm border-teal-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-teal-700 font-semibold">客户满意</h3>
                <Flower2 className="h-5 w-5 text-teal-500" />
              </div>
              <div className="text-3xl font-bold text-teal-600 mb-2">
                {customerSatisfaction.toFixed(0)}%
              </div>
              <div className="text-sm text-teal-600">整体满意度</div>
            </CardContent>
          </Card>

          {/* 系统活跃度 */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-700 font-semibold">系统活跃</h3>
                <Waves className="h-5 w-5 text-blue-500 animate-bounce" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                2,847
              </div>
              <div className="text-sm text-blue-600">活跃用户数</div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 客户生态森林 */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-700 font-semibold text-lg">客户生态森林</h3>
                <TreePine className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="relative h-64 bg-gradient-to-b from-green-100 to-green-200 rounded-lg overflow-hidden">
                {/* 模拟树木节点 */}
                {[
                  { size: 'large', x: 20, y: 60, color: 'text-green-600' },
                  { size: 'medium', x: 40, y: 70, color: 'text-green-500' },
                  { size: 'small', x: 60, y: 80, color: 'text-green-400' },
                  { size: 'large', x: 80, y: 65, color: 'text-emerald-600' },
                  { size: 'medium', x: 30, y: 40, color: 'text-emerald-500' },
                  { size: 'small', x: 70, y: 45, color: 'text-teal-500' }
                ].map((tree, i) => (
                  <div
                    key={i}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform duration-300 ${tree.color}`}
                    style={{ left: `${tree.x}%`, top: `${tree.y}%` }}
                  >
                    <TreePine 
                      className={`
                        ${tree.size === 'large' ? 'h-8 w-8' : 
                          tree.size === 'medium' ? 'h-6 w-6' : 'h-4 w-4'}
                        animate-pulse
                      `}
                    />
                  </div>
                ))}
                
                {/* 连接根系 */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                    <path
                      key={i}
                      d={`M ${20 + i * 12}% 80% Q ${30 + i * 10}% 85% ${40 + i * 8}% 80%`}
                      stroke="rgba(34, 197, 94, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                  ))}
                </svg>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">156</div>
                  <div className="text-gray-500">高价值客户</div>
                </div>
                <div className="text-center">
                  <div className="text-emerald-600 font-semibold">284</div>
                  <div className="text-gray-500">成长中客户</div>
                </div>
                <div className="text-center">
                  <div className="text-teal-600 font-semibold">92</div>
                  <div className="text-gray-500">新增客户</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 有机任务流 */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-700 font-semibold text-lg">有机任务流</h3>
                <Waves className="h-5 w-5 text-blue-500" />
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    task: '客户关怀计划执行', 
                    status: 'flowing', 
                    progress: 85, 
                    icon: Heart,
                    color: 'text-pink-500'
                  },
                  { 
                    task: '新产品推广策略', 
                    status: 'growing', 
                    progress: 60, 
                    icon: Sprout,
                    color: 'text-green-500'
                  },
                  { 
                    task: '客户反馈处理', 
                    status: 'nurturing', 
                    progress: 40, 
                    icon: Flower2,
                    color: 'text-purple-500'
                  }
                ].map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={i} className="relative">
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                        <div className={`p-2 rounded-full bg-gray-100 ${item.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{item.task}</div>
                          <div className="text-sm text-gray-500 capitalize">{item.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">{item.progress}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* 流动效果 */}
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" />
                        <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                <Waves className="h-4 w-4 mr-2" />
                启动自然流程
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalEcoPark;
