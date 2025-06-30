
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Grid3X3, Zap, Binary, Cpu, Database, Network, 
  Activity, TrendingUp, Users, Target 
} from 'lucide-react';

interface QuantumMatrixProps {
  isFullscreen?: boolean;
}

const QuantumMatrix: React.FC<QuantumMatrixProps> = ({ isFullscreen = false }) => {
  const [quantumState, setQuantumState] = useState('COHERENT');
  const [entanglement, setEntanglement] = useState(94.7);
  const [processingPower, setProcessingPower] = useState(2847);
  const [matrixNodes, setMatrixNodes] = useState(Array(36).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      // 模拟量子态变化
      setQuantumState(prev => 
        Math.random() > 0.8 ? 
        (Math.random() > 0.5 ? 'SUPERPOSITION' : 'ENTANGLED') : 
        'COHERENT'
      );
      
      setEntanglement(prev => Math.min(100, Math.max(80, prev + (Math.random() - 0.5) * 5)));
      setProcessingPower(prev => Math.max(1000, prev + (Math.random() - 0.5) * 100));
      
      // 随机激活矩阵节点
      setMatrixNodes(prev => 
        prev.map(() => Math.random() > 0.7)
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getQuantumColor = (state: string) => {
    switch (state) {
      case 'SUPERPOSITION': return 'text-purple-400';
      case 'ENTANGLED': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className={`${isFullscreen ? 'h-full' : 'h-[800px]'} bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden`}>
      {/* 量子网格背景 */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          <defs>
            <pattern id="quantumGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quantumGrid)" />
        </svg>
        
        {/* 量子粒子效果 */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 10px #3b82f6'
            }}
          />
        ))}
      </div>

      {/* 扫描线效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />

      <div className="relative z-10 p-6 h-full">
        {/* 量子控制台头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Grid3X3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">
                QUANTUM MATRIX
              </h1>
            </div>
            <Badge className={`font-mono ${getQuantumColor(quantumState)} bg-black/50 border-current`}>
              {quantumState}
            </Badge>
          </div>
          <div className="text-right font-mono">
            <div className="text-blue-400 text-lg">
              {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-gray-400 text-sm">
              QUANTUM TIME
            </div>
          </div>
        </div>

        {/* 量子参数面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* 量子纠缠度 */}
          <Card className="bg-black/60 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-blue-300 font-mono text-sm">ENTANGLEMENT</h3>
                <Binary className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-blue-400">
                {entanglement.toFixed(1)}%
              </div>
              <div className="w-full bg-gray-800 rounded h-1 mt-2">
                <div 
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded transition-all duration-1000"
                  style={{ width: `${entanglement}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* 处理能力 */}
          <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-purple-300 font-mono text-sm">PROCESSING</h3>
                <Cpu className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-purple-400">
                {processingPower.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 font-mono">QOPS/SEC</div>
            </CardContent>
          </Card>

          {/* 数据流 */}
          <Card className="bg-black/60 border-green-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-green-300 font-mono text-sm">DATA FLOW</h3>
                <Database className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-mono font-bold text-green-400">
                847.3
              </div>
              <div className="text-xs text-gray-400 font-mono">TB/MIN</div>
            </CardContent>
          </Card>

          {/* 网络状态 */}
          <Card className="bg-black/60 border-red-500/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-red-300 font-mono text-sm">NETWORK</h3>
                <Network className="h-4 w-4 text-red-400 animate-pulse" />
              </div>
              <div className="text-2xl font-mono font-bold text-red-400">
                OPTIMAL
              </div>
              <div className="text-xs text-gray-400 font-mono">99.97% UPTIME</div>
            </CardContent>
          </Card>
        </div>

        {/* 主量子控制区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 量子矩阵可视化 */}
          <Card className="bg-black/60 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-300 font-mono text-lg">QUANTUM MATRIX</h3>
                <Grid3X3 className="h-5 w-5 text-blue-400" />
              </div>
              
              <div className="grid grid-cols-6 gap-2 mb-4">
                {matrixNodes.map((active, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 border rounded transition-all duration-500 cursor-pointer hover:scale-110 ${
                      active 
                        ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-800 border-gray-600 hover:border-blue-500/50'
                    }`}
                    style={{
                      boxShadow: active ? '0 0 15px rgba(59, 130, 246, 0.7)' : 'none'
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-400 font-mono mb-2">
                  ACTIVE NODES: {matrixNodes.filter(Boolean).length}/36
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 font-mono text-sm"
                  onClick={() => setMatrixNodes(Array(36).fill(true))}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  ACTIVATE ALL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 量子任务处理器 */}
          <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-300 font-mono text-lg">TASK PROCESSOR</h3>
                <Activity className="h-5 w-5 text-purple-400" />
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    id: 'QT001', 
                    task: 'Customer Data Analysis', 
                    priority: 'HIGH', 
                    progress: 87,
                    qubits: 1247
                  },
                  { 
                    id: 'QT002', 
                    task: 'Predictive Modeling', 
                    priority: 'MEDIUM', 
                    progress: 62,
                    qubits: 834
                  },
                  { 
                    id: 'QT003', 
                    task: 'Pattern Recognition', 
                    priority: 'LOW', 
                    progress: 34,
                    qubits: 567
                  }
                ].map((task, i) => (
                  <div key={i} className="p-3 bg-gray-900/50 rounded border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 font-mono">{task.id}</span>
                        <Badge 
                          variant="outline"
                          className={`text-xs font-mono ${
                            task.priority === 'HIGH' ? 'border-red-500 text-red-400' :
                            task.priority === 'MEDIUM' ? 'border-yellow-500 text-yellow-400' :
                            'border-green-500 text-green-400'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-blue-400 font-mono">{task.qubits} QUBITS</span>
                    </div>
                    <div className="text-sm text-white font-mono mb-2">{task.task}</div>
                    <div className="w-full bg-gray-800 rounded h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded transition-all duration-1000"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{task.progress}% COMPLETE</div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 font-mono">
                <Zap className="h-4 w-4 mr-2" />
                QUANTUM BOOST
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuantumMatrix;
