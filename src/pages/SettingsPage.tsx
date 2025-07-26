import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Database, Key, Globe, Shield, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [connections, setConnections] = useState({
    supabase: { url: '', key: '', connected: false },
    apify: { token: '', connected: false },
    openrouter: { apiKey: '', connected: false },
    customs: { apiKey: '', endpoint: '', connected: false }
  });

  const handleSaveConnection = (platform: string, data: any) => {
    setConnections(prev => ({
      ...prev,
      [platform]: { ...prev[platform], ...data, connected: true }
    }));
    
    toast({
      title: "连接已保存",
      description: `${platform.toUpperCase()} 连接配置已成功保存`,
    });
  };

  const handleTestConnection = async (platform: string) => {
    toast({
      title: "测试连接",
      description: `正在测试 ${platform.toUpperCase()} 连接...`,
    });
    
    // 模拟连接测试
    setTimeout(() => {
      toast({
        title: "连接成功",
        description: `${platform.toUpperCase()} 连接测试通过`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">系统设置</h1>
              <p className="text-muted-foreground mt-1">配置各个平台的API连接参数和系统偏好设置</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white border shadow-sm rounded-xl p-2">
            <TabsTrigger 
              value="api" 
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-blue-50"
            >
              <Key className="h-5 w-5" />
              API连接
            </TabsTrigger>
            <TabsTrigger 
              value="database" 
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-green-50"
            >
              <Database className="h-5 w-5" />
              EDM/WhatsApp
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-purple-50"
            >
              <Shield className="h-5 w-5" />
              安全设置
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-orange-50"
            >
              <Bell className="h-5 w-5" />
              通知设置
            </TabsTrigger>
          </TabsList>

          {/* API连接设置 */}
          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Supabase */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-green-600" />
                      <CardTitle>Supabase</CardTitle>
                    </div>
                    <Badge variant={connections.supabase.connected ? "default" : "secondary"}>
                      {connections.supabase.connected ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <CardDescription>配置Supabase数据库连接</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="supabase-url">项目URL</Label>
                    <Input 
                      id="supabase-url" 
                      placeholder="https://your-project.supabase.co"
                      value={connections.supabase.url}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        supabase: { ...prev.supabase, url: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supabase-key">API密钥</Label>
                    <Input 
                      id="supabase-key" 
                      type="password"
                      placeholder="your-anon-key"
                      value={connections.supabase.key}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        supabase: { ...prev.supabase, key: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSaveConnection('supabase', connections.supabase)}
                      className="flex-1"
                    >
                      保存配置
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestConnection('supabase')}
                    >
                      测试连接
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Apify */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <CardTitle>Apify</CardTitle>
                    </div>
                    <Badge variant={connections.apify.connected ? "default" : "secondary"}>
                      {connections.apify.connected ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <CardDescription>配置Apify网络爬虫服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="apify-token">API Token</Label>
                    <Input 
                      id="apify-token" 
                      type="password"
                      placeholder="apify_api_xxxxx"
                      value={connections.apify.token}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        apify: { ...prev.apify, token: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSaveConnection('apify', connections.apify)}
                      className="flex-1"
                    >
                      保存配置
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestConnection('apify')}
                    >
                      测试连接
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* OpenRouter */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-purple-600" />
                      <CardTitle>OpenRouter</CardTitle>
                    </div>
                    <Badge variant={connections.openrouter.connected ? "default" : "secondary"}>
                      {connections.openrouter.connected ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <CardDescription>配置OpenRouter AI模型服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="openrouter-key">API密钥</Label>
                    <Input 
                      id="openrouter-key" 
                      type="password"
                      placeholder="sk-or-v1-xxxxx"
                      value={connections.openrouter.apiKey}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        openrouter: { ...prev.openrouter, apiKey: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSaveConnection('openrouter', connections.openrouter)}
                      className="flex-1"
                    >
                      保存配置
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestConnection('openrouter')}
                    >
                      测试连接
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 海关数据API */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-orange-600" />
                      <CardTitle>海关数据API</CardTitle>
                    </div>
                    <Badge variant={connections.customs.connected ? "default" : "secondary"}>
                      {connections.customs.connected ? "已连接" : "未连接"}
                    </Badge>
                  </div>
                  <CardDescription>配置海关数据分析服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customs-endpoint">API端点</Label>
                    <Input 
                      id="customs-endpoint" 
                      placeholder="https://api.customs-data.com"
                      value={connections.customs.endpoint}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        customs: { ...prev.customs, endpoint: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customs-key">API密钥</Label>
                    <Input 
                      id="customs-key" 
                      type="password"
                      placeholder="your-customs-api-key"
                      value={connections.customs.apiKey}
                      onChange={(e) => setConnections(prev => ({
                        ...prev,
                        customs: { ...prev.customs, apiKey: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSaveConnection('customs', connections.customs)}
                      className="flex-1"
                    >
                      保存配置
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestConnection('customs')}
                    >
                      测试连接
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* EDM/WhatsApp设置 */}
          <TabsContent value="database" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 邮件发送平台 */}
              <Card>
                <CardHeader>
                  <CardTitle>邮件发送平台 (EDM)</CardTitle>
                  <CardDescription>配置邮件营销服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP服务器</Label>
                    <Input 
                      id="smtp-host" 
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">端口</Label>
                    <Input 
                      id="smtp-port" 
                      type="number"
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-user">用户名</Label>
                    <Input 
                      id="smtp-user" 
                      type="email"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-pass">密码</Label>
                    <Input 
                      id="smtp-pass" 
                      type="password"
                      placeholder="app-password"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">保存配置</Button>
                    <Button variant="outline">测试连接</Button>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp配置 */}
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Business</CardTitle>
                  <CardDescription>配置WhatsApp营销服务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="whatsapp-token">Access Token</Label>
                    <Input 
                      id="whatsapp-token" 
                      type="password"
                      placeholder="WhatsApp Business API Token"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp-phone">电话号码ID</Label>
                    <Input 
                      id="whatsapp-phone" 
                      placeholder="Phone Number ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                    <Input 
                      id="whatsapp-webhook" 
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp-verify">验证令牌</Label>
                    <Input 
                      id="whatsapp-verify" 
                      type="password"
                      placeholder="Webhook验证令牌"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">保存配置</Button>
                    <Button variant="outline">测试连接</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 营销设置 */}
            <Card>
              <CardHeader>
                <CardTitle>营销设置</CardTitle>
                <CardDescription>配置自动化营销功能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">自动跟进</h4>
                    <p className="text-sm text-muted-foreground">根据客户行为自动发送跟进消息</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">批量营销</h4>
                    <p className="text-sm text-muted-foreground">启用批量邮件和WhatsApp营销</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="daily-limit">每日发送限制</Label>
                  <Input 
                    id="daily-limit" 
                    type="number" 
                    defaultValue="1000" 
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 安全设置 */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>配置账户安全和访问控制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">双因素认证</h4>
                    <p className="text-sm text-muted-foreground">启用双因素认证提高账户安全性</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API访问日志</h4>
                    <p className="text-sm text-muted-foreground">记录所有API访问请求</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="session-timeout">会话超时时间（分钟）</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    defaultValue="30" 
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知设置 */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>管理系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">邮件通知</h4>
                    <p className="text-sm text-muted-foreground">接收重要系统通知邮件</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">数据分析报告</h4>
                    <p className="text-sm text-muted-foreground">定期接收数据分析报告</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">客户动态提醒</h4>
                    <p className="text-sm text-muted-foreground">新客户或重要客户动态提醒</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="notification-email">通知邮箱</Label>
                  <Input 
                    id="notification-email" 
                    type="email" 
                    placeholder="admin@company.com" 
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;