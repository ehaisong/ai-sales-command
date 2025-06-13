
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIWorkflow = () => {
  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="flex-shrink-0 text-center">
        <CardTitle className="text-xl font-bold">AI工作流</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-8">
          {/* 描述文本 */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              一站式引流转化系统，24小时不停全网自动找客户，
            </p>
            <p className="text-sm text-muted-foreground">
              自动发邮件接触客户，为每一位客户建立营销档案，
            </p>
            <p className="text-sm text-muted-foreground">
              根据客户的背景及回复自动交流。
            </p>
          </div>

          {/* 流程图 */}
          <div className="flex flex-col items-center space-y-6">
            {/* 两个输入框 */}
            <div className="flex space-x-8">
              <div className="w-24 h-12 border-2 border-gray-400 bg-white"></div>
              <div className="w-24 h-12 border-2 border-gray-400 bg-white"></div>
            </div>
            
            {/* 连接线和汇聚点 */}
            <div className="relative">
              <div className="w-8 h-8 border-2 border-gray-400 bg-white transform rotate-45"></div>
            </div>
            
            {/* 中间处理框 */}
            <div className="w-32 h-12 border-2 border-gray-400 bg-white"></div>
            
            {/* 最终输出 */}
            <div className="w-24 h-8 border-2 border-gray-400 bg-white flex items-center justify-center">
              <span className="text-xs text-gray-600">启用/暂停</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIWorkflow;
