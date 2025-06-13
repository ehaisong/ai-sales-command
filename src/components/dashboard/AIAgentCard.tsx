
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const AIAgentCard = () => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-lg text-center">AI业务员</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI头像和基本信息 */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* 名称和能力 */}
        <div className="text-center space-y-2">
          <div>
            <span className="text-sm text-muted-foreground">名称</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">能力</span>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="space-y-2 text-center">
          <div className="text-sm">
            <span className="text-muted-foreground">每日发信：</span>
            <span className="font-semibold">320</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">每日搜索：</span>
            <span className="font-semibold">210位</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">知识库：</span>
            <span className="font-semibold">320M/1000M</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            信息修改
          </Button>
          <Button className="w-full" size="sm">
            知识库
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentCard;
