
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bot,
  Settings,
  MessageSquare,
  Zap,
  Clock,
  Target,
  Brain,
  Users,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { CustomerConversationSummary } from '@/types/conversation';

interface AISettingsPanelProps {
  selectedCustomer: CustomerConversationSummary | null;
  onStartAIChat: () => void;
  onManualTakeover: () => void;
}

const AISettingsPanel: React.FC<AISettingsPanelProps> = ({
  selectedCustomer,
  onStartAIChat,
  onManualTakeover
}) => {
  const [aiSettings, setAISettings] = useState({
    autoReply: true,
    responseDelay: 2,
    tone: 'professional',
    language: 'zh',
  });

  const [aiPrompt, setAIPrompt] = useState('');

  const handleRestoreAI = () => {
    // This would normally update the customer's AI status
    console.log('Restoring AI management for customer:', selectedCustomer?.id);
  };

  if (!selectedCustomer) {
    return (
      <div className="space-y-4">
        <Card className="border-gray-200">
          <CardContent className="p-6 text-center">
            <Bot className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-2">AI助手待命中</h3>
            <p className="text-gray-500 text-sm">选择客户后开始智能对话分析</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* AI Status Card */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Bot className="mr-2 h-5 w-5 text-emerald-500" />
            AI管理状态
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">当前模式</span>
            <Badge 
              variant={selectedCustomer.isAIManaged ? "default" : "secondary"} 
              className={`text-xs ${
                selectedCustomer.isAIManaged 
                  ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                  : 'bg-orange-100 text-orange-700 border-orange-200'
              }`}
            >
              {selectedCustomer.isAIManaged ? (
                <>
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI自动管理
                </>
              ) : (
                <>
                  <Users className="mr-1 h-3 w-3" />
                  手动管理
                </>
              )}
            </Badge>
          </div>
          
          {selectedCustomer.isAIManaged ? (
            <Button 
              onClick={onManualTakeover}
              variant="outline" 
              className="w-full text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
            >
              <Users className="mr-2 h-4 w-4" />
              切换到手动模式
            </Button>
          ) : (
            <Button 
              onClick={handleRestoreAI}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Bot className="mr-2 h-4 w-4" />
              恢复AI管理
            </Button>
          )}
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
            AI对话助手
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="询问AI助手关于这位客户的问题..."
            value={aiPrompt}
            onChange={(e) => setAIPrompt(e.target.value)}
            className="min-h-[80px] resize-none border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Button 
            onClick={onStartAIChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!aiPrompt.trim()}
          >
            <Brain className="mr-2 h-4 w-4" />
            咨询AI助手
          </Button>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Settings className="mr-2 h-5 w-5 text-gray-600" />
            AI设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">智能自动回复</span>
            </div>
            <Switch
              checked={aiSettings.autoReply}
              onCheckedChange={(checked) => 
                setAISettings(prev => ({ ...prev, autoReply: checked }))
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm">响应延迟</span>
            </div>
            <Badge variant="outline" className="text-xs border-gray-200">
              {aiSettings.responseDelay}秒
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm">对话风格</span>
            </div>
            <Badge variant="outline" className="text-xs border-gray-200">
              专业商务
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
            AI智能分析
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">客户意向分析</p>
                <p className="text-xs text-blue-700 mt-1">
                  该客户表现出强烈的购买意向，最近询价频率增加，建议主动提供详细报价。
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-start space-x-2">
              <Bot className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-900">推荐策略</p>
                <p className="text-xs text-emerald-700 mt-1">
                  基于历史数据，建议发送产品技术规格和案例研究，成交概率提升30%。
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-start space-x-2">
              <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-900">跟进提醒</p>
                <p className="text-xs text-amber-700 mt-1">
                  客户上次咨询时间超过24小时，建议主动跟进维持沟通热度。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettingsPanel;
