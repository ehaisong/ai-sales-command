
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
  AlertCircle
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

  if (!selectedCustomer) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Bot className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">选择客户开始AI对话</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* AI Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Bot className="mr-2 h-5 w-5 text-blue-500" />
            AI状态
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">当前模式</span>
            <Badge variant={selectedCustomer.isAIManaged ? "default" : "secondary"} className="text-xs">
              {selectedCustomer.isAIManaged ? 'AI自动' : '手动管理'}
            </Badge>
          </div>
          
          {selectedCustomer.isAIManaged ? (
            <Button 
              onClick={onManualTakeover}
              variant="outline" 
              className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <Users className="mr-2 h-4 w-4" />
              切换到手动模式
            </Button>
          ) : (
            <Button 
              onClick={() => {/* 恢复AI管理 */}}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Bot className="mr-2 h-4 w-4" />
              恢复AI管理
            </Button>
          )}
        </CardContent>
      </Card>

      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
            AI对话助手
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="向AI助手提问或获取建议..."
            value={aiPrompt}
            onChange={(e) => setAIPrompt(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button 
            onClick={onStartAIChat}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!aiPrompt.trim()}
          >
            <Brain className="mr-2 h-4 w-4" />
            咨询AI助手
          </Button>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings className="mr-2 h-5 w-5 text-gray-600" />
            AI设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">自动回复</span>
            </div>
            <Switch
              checked={aiSettings.autoReply}
              onCheckedChange={(checked) => 
                setAISettings(prev => ({ ...prev, autoReply: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm">响应延迟</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {aiSettings.responseDelay}秒
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-500" />
              <span className="text-sm">对话风格</span>
            </div>
            <Badge variant="outline" className="text-xs">
              专业
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Customer AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
            AI洞察
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">客户意向分析</p>
                <p className="text-xs text-blue-700 mt-1">
                  该客户表现出强烈的购买意向，建议主动跟进报价。
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Bot className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">推荐回复</p>
                <p className="text-xs text-green-700 mt-1">
                  建议发送产品详细规格和最新优惠信息。
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
