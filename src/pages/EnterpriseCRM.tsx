
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import StarCommandCenter from '@/components/enterprise-crm/StarCommandCenter';
import DigitalEcoPark from '@/components/enterprise-crm/DigitalEcoPark';
import QuantumMatrix from '@/components/enterprise-crm/QuantumMatrix';
import { Rocket, Leaf, Grid3X3, Settings, Maximize2 } from 'lucide-react';

const EnterpriseCRM = () => {
  const [selectedInterface, setSelectedInterface] = useState('star');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const interfaces = [
    {
      id: 'star',
      name: 'Star Command Center',
      icon: Rocket,
      description: '太空指挥中心风格的高端执行界面',
      component: StarCommandCenter
    },
    {
      id: 'eco',
      name: 'Digital Eco-Park',
      icon: Leaf,
      description: '有机生态风格的现代化管理界面',
      component: DigitalEcoPark
    },
    {
      id: 'quantum',
      name: 'Quantum Matrix',
      icon: Grid3X3,
      description: '量子矩阵风格的未来科技界面',
      component: QuantumMatrix
    }
  ];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const CurrentInterface = interfaces.find(i => i.id === selectedInterface)?.component || StarCommandCenter;

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'p-6'} transition-all duration-500`}>
      {!isFullscreen && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-monday-blue to-monday-purple bg-clip-text text-transparent">
                Enterprise CRM System
              </h1>
              <p className="text-muted-foreground mt-1">高端企业级客户关系管理系统</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                系统设置
              </Button>
              <Button onClick={toggleFullscreen} size="sm">
                <Maximize2 className="h-4 w-4 mr-1" />
                全屏模式
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interfaces.map((interface_item) => {
                  const IconComponent = interface_item.icon;
                  const isSelected = selectedInterface === interface_item.id;
                  
                  return (
                    <div
                      key={interface_item.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        isSelected 
                          ? 'border-monday-blue bg-monday-blue/5 shadow-monday' 
                          : 'border-gray-200 hover:border-monday-blue/50'
                      }`}
                      onClick={() => setSelectedInterface(interface_item.id)}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-monday-blue text-white' : 'bg-gray-100'
                        }`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold">{interface_item.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{interface_item.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className={`${isFullscreen ? 'h-full' : 'min-h-[800px]'} relative`}>
        {isFullscreen && (
          <Button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10"
            variant="outline"
            size="sm"
          >
            退出全屏
          </Button>
        )}
        <CurrentInterface isFullscreen={isFullscreen} />
      </div>
    </div>
  );
};

export default EnterpriseCRM;
