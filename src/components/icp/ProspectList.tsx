import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Star, StarOff, Mail, Phone, ExternalLink, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Prospect } from '@/types/icp';
import { toast } from '@/hooks/use-toast';

interface ProspectListProps {
  knowledgeBaseId: string;
}

export const ProspectList = ({ knowledgeBaseId }: ProspectListProps) => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'priority' | 'high_score'>('all');

  useEffect(() => {
    if (knowledgeBaseId) {
      fetchProspects();
    }
  }, [knowledgeBaseId]);

  const fetchProspects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .eq('knowledge_base_id', knowledgeBaseId)
        .order('score', { ascending: false });

      if (error) throw error;
      setProspects(data || []);
    } catch (error) {
      console.error('Error fetching prospects:', error);
      toast({
        title: '错误',
        description: '获取潜在客户失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePriority = async (prospectId: string, currentPriority: boolean) => {
    try {
      const { error } = await supabase
        .from('prospects')
        .update({ is_priority: !currentPriority })
        .eq('id', prospectId);

      if (error) throw error;

      setProspects(prev => 
        prev.map(p => 
          p.id === prospectId 
            ? { ...p, is_priority: !currentPriority }
            : p
        )
      );

      toast({
        title: '成功',
        description: `已${!currentPriority ? '添加到' : '移出'}重点关注`,
      });
    } catch (error) {
      console.error('Error updating prospect priority:', error);
      toast({
        title: '错误',
        description: '更新失败',
        variant: 'destructive',
      });
    }
  };

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = !searchQuery || 
      prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.position?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' || 
      (filter === 'priority' && prospect.is_priority) ||
      (filter === 'high_score' && (prospect.score || 0) >= 80);

    return matchesSearch && matchesFilter;
  });

  const getScoreBadgeVariant = (score?: number) => {
    if (!score) return 'secondary';
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'outline';
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    return 'text-orange-600';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              潜在客户列表
              <Badge variant="secondary">{filteredProspects.length}</Badge>
            </CardTitle>
            <CardDescription>
              基于ICP分析生成的潜在客户数据
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索客户..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  全部客户
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('priority')}>
                  重点关注
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('high_score')}>
                  高分客户 (≥80)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredProspects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">暂无潜在客户数据</p>
            <p className="text-sm text-muted-foreground mt-1">
              配置完ICP后，系统将自动生成匹配的潜在客户
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户</TableHead>
                <TableHead>公司</TableHead>
                <TableHead>职位</TableHead>
                <TableHead>匹配分数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map((prospect) => (
                <TableRow key={prospect.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="font-medium">{prospect.name}</div>
                        {prospect.email && (
                          <div className="text-sm text-muted-foreground">
                            {prospect.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium">{prospect.company}</div>
                      {prospect.industry && (
                        <div className="text-sm text-muted-foreground">
                          {prospect.industry}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">
                      {prospect.position || '未知'}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={getScoreBadgeVariant(prospect.score)}
                      className={getScoreColor(prospect.score)}
                    >
                      {prospect.score ? `${prospect.score}分` : '未评分'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {prospect.is_priority && (
                        <Badge variant="default" className="text-xs">
                          重点关注
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {prospect.source === 'ai_generated' ? 'AI生成' : 
                         prospect.source === 'imported' ? '导入' : '手动添加'}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePriority(prospect.id, prospect.is_priority)}
                      >
                        {prospect.is_priority ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      
                      {prospect.email && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${prospect.email}`)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {prospect.linkedin_url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(prospect.linkedin_url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem>编辑信息</DropdownMenuItem>
                          <DropdownMenuItem>添加备注</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};