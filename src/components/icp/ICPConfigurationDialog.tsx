import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ICPConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  knowledgeBaseId: string;
  onSuccess: () => void;
}

export const ICPConfigurationDialog = ({ 
  open, 
  onOpenChange, 
  knowledgeBaseId, 
  onSuccess 
}: ICPConfigurationDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customerType, setCustomerType] = useState<'B2B' | 'B2C'>('B2B');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('icp_configurations')
        .insert({
          knowledge_base_id: knowledgeBaseId,
          name,
          description,
          customer_type: customerType,
          is_active: isActive,
        });

      if (error) throw error;

      toast({
        title: '成功',
        description: 'ICP配置创建成功',
      });

      // Reset form
      setName('');
      setDescription('');
      setCustomerType('B2B');
      setIsActive(true);
      
      onSuccess();
    } catch (error) {
      console.error('Error creating ICP configuration:', error);
      toast({
        title: '错误',
        description: '创建ICP配置失败',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建ICP配置</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">配置名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：企业级软件用户"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerType">客户类型</Label>
            <Select value={customerType} onValueChange={(value: 'B2B' | 'B2C') => setCustomerType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B2B">B2B (企业客户)</SelectItem>
                <SelectItem value="B2C">B2C (消费者客户)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述这个ICP配置的用途和特点..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="isActive">立即激活</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '创建中...' : '创建'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};