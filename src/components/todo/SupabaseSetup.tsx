
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Database, Settings } from 'lucide-react';

const SupabaseSetup = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Supabase 配置</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            请按照以下步骤配置 Supabase：
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium mb-2">1. 更新配置文件</h4>
            <p className="text-gray-600 mb-2">
              请在 <code className="bg-gray-100 px-1 rounded">src/config/supabase.ts</code> 文件中替换：
            </p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <div>export const SUPABASE_URL = '您的_SUPABASE_项目_URL';</div>
              <div>export const SUPABASE_ANON_KEY = '您的_SUPABASE_匿名_密钥';</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">2. 创建数据库表</h4>
            <p className="text-gray-600 mb-2">
              在 Supabase 控制台中执行以下 SQL：
            </p>
            <div className="bg-gray-100 p-3 rounded text-xs font-mono">
              <div>CREATE TABLE todos (</div>
              <div>&nbsp;&nbsp;id UUID DEFAULT gen_random_uuid() PRIMARY KEY,</div>
              <div>&nbsp;&nbsp;text TEXT NOT NULL,</div>
              <div>&nbsp;&nbsp;completed BOOLEAN DEFAULT FALSE,</div>
              <div>&nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()</div>
              <div>);</div>
              <br />
              <div>-- 启用行级安全 (可选)</div>
              <div>ALTER TABLE todos ENABLE ROW LEVEL SECURITY;</div>
              <br />
              <div>-- 允许所有操作的策略 (开发环境)</div>
              <div>CREATE POLICY "Enable all operations for todos" ON todos</div>
              <div>&nbsp;&nbsp;FOR ALL USING (true);</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">3. 启用实时功能</h4>
            <p className="text-gray-600">
              在 Supabase 控制台的 Database → Replication 中为 todos 表启用实时更新。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseSetup;
