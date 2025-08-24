import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Users, TrendingUp, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ICPConfiguration, KnowledgeBase } from '@/types/icp';
import { ICPGenerateDialog } from '@/components/icp/ICPGenerateDialog';
import { ICPAnalysisCard } from '@/components/icp/ICPAnalysisCard';
import { ProspectList } from '@/components/icp/ProspectList';
import { toast } from '@/hooks/use-toast';

export default function ICPAnalysisPage() {
  const { user } = useAuth();
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [icpConfigurations, setICPConfigurations] = useState<ICPConfiguration[]>([]);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string>('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchKnowledgeBases();
    }
  }, [user]);

  useEffect(() => {
    if (selectedKnowledgeBase) {
      fetchICPConfigurations();
    }
  }, [selectedKnowledgeBase]);

  const fetchKnowledgeBases = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_bases')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setKnowledgeBases(data || []);
      
      if (data && data.length > 0 && !selectedKnowledgeBase) {
        setSelectedKnowledgeBase(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching knowledge bases:', error);
      toast({
        title: '错误',
        description: '获取知识库失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchICPConfigurations = async () => {
    if (!selectedKnowledgeBase) return;

    try {
      const { data, error } = await supabase
        .from('icp_configurations')
        .select('*')
        .eq('knowledge_base_id', selectedKnowledgeBase)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setICPConfigurations(data || []);
    } catch (error) {
      console.error('Error fetching ICP configurations:', error);
      toast({
        title: '错误',
        description: '获取ICP配置失败',
        variant: 'destructive',
      });
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateDialog(false);
    fetchICPConfigurations();
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">理想客户画像 (ICP)</h1>
            <p className="page-subtitle">定义和分析您的理想客户特征</p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)} className="monday-button">
            <Plus className="h-4 w-4 mr-2" />
            创建智能ICP
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="monday-card-small">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{icpConfigurations.length}</p>
              <p className="text-sm text-muted-foreground">ICP配置</p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card className="monday-card-small">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {icpConfigurations.filter(icp => icp.is_active).length}
              </p>
              <p className="text-sm text-muted-foreground">活跃配置</p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent" />
          </CardContent>
        </Card>

        <Card className="monday-card-small">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {icpConfigurations.filter(icp => icp.customer_type === 'B2B').length}
              </p>
              <p className="text-sm text-muted-foreground">B2B客户</p>
            </div>
            <Building2 className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card className="monday-card-small">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {icpConfigurations.filter(icp => icp.customer_type === 'B2C').length}
              </p>
              <p className="text-sm text-muted-foreground">B2C客户</p>
            </div>
            <Users className="h-8 w-8 text-accent" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedKnowledgeBase} onValueChange={setSelectedKnowledgeBase}>
        <TabsList>
          {knowledgeBases.map((kb) => (
            <TabsTrigger key={kb.id} value={kb.id}>
              {kb.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {knowledgeBases.map((kb) => (
          <TabsContent key={kb.id} value={kb.id} className="mt-6">
            <div className="grid gap-6">
              {icpConfigurations.length === 0 ? (
                <Card className="monday-card-large text-center">
                  <CardContent className="p-8">
                    <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      还没有ICP配置
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      创建您的第一个理想客户画像配置
                    </p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      创建智能ICP
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {icpConfigurations.map((icp) => (
                    <ICPAnalysisCard
                      key={icp.id}
                      configuration={icp}
                      onUpdate={fetchICPConfigurations}
                    />
                  ))}
                </div>
              )}
              
              {/* 潜在客户列表 */}
              {icpConfigurations.length > 0 && (
                <div className="mt-8">
                  <ProspectList knowledgeBaseId={selectedKnowledgeBase} />
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <ICPGenerateDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        knowledgeBaseId={selectedKnowledgeBase}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}