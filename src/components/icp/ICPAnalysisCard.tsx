import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ICPConfiguration } from '@/types/icp';
import { MoreHorizontal, Edit, Trash2, Play, Pause, Users, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ICPAnalysisCardProps {
  configuration: ICPConfiguration;
  onUpdate: () => void;
}

export const ICPAnalysisCard = ({ configuration, onUpdate }: ICPAnalysisCardProps) => {
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('icp_configurations')
        .update({ is_active: !configuration.is_active })
        .eq('id', configuration.id);

      if (error) throw error;

      toast({
        title: '成功',
        description: `ICP配置已${configuration.is_active ? '停用' : '启用'}`,
      });

      onUpdate();
    } catch (error) {
      console.error('Error toggling ICP status:', error);
      toast({
        title: '错误',
        description: '操作失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteConfiguration = async () => {
    if (!confirm('确定要删除这个ICP配置吗？此操作不可撤销。')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('icp_configurations')
        .delete()
        .eq('id', configuration.id);

      if (error) throw error;

      toast({
        title: '成功',
        description: 'ICP配置已删除',
      });

      onUpdate();
    } catch (error) {
      console.error('Error deleting ICP configuration:', error);
      toast({
        title: '错误',
        description: '删除失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="monday-card-medium">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {configuration.customer_type === 'B2B' ? (
            <Building2 className="h-5 w-5 text-primary" />
          ) : (
            <Users className="h-5 w-5 text-accent" />
          )}
          <div>
            <CardTitle className="text-lg">{configuration.name}</CardTitle>
            <CardDescription>
              {configuration.description || '暂无描述'}
            </CardDescription>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={configuration.is_active ? 'default' : 'secondary'}>
            {configuration.is_active ? '活跃' : '停用'}
          </Badge>
          <Badge variant="outline">
            {configuration.customer_type}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={loading}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleActive}>
                {configuration.is_active ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    停用
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    启用
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteConfiguration} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>创建时间：{formatDate(configuration.created_at)}</span>
          <span>更新时间：{formatDate(configuration.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
};