import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ICPTemplateSelector } from './ICPTemplateSelector';
import { ICPB2BForm } from './ICPB2BForm';
import { ICPB2CForm } from './ICPB2CForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ICPGenerateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  knowledgeBaseId: string;
  onSuccess: () => void;
}

interface ICPTemplate {
  id: string;
  name: string;
  description: string;
  type: 'B2B' | 'B2C';
  icon: any;
  color: string;
}

export const ICPGenerateDialog = ({ 
  open, 
  onOpenChange, 
  knowledgeBaseId, 
  onSuccess 
}: ICPGenerateDialogProps) => {
  const [step, setStep] = useState<'template' | 'form'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ICPTemplate | null>(null);
  const [customerType, setCustomerType] = useState<'B2B' | 'B2C'>('B2B');

  const handleTemplateSelect = (template: ICPTemplate) => {
    setSelectedTemplate(template);
    setCustomerType(template.type);
    setStep('form');
  };

  const handleBack = () => {
    setStep('template');
    setSelectedTemplate(null);
  };

  const handleFormSuccess = async (data: any) => {
    try {
      // 创建ICP配置
      const { data: icpConfig, error: configError } = await supabase
        .from('icp_configurations')
        .insert({
          knowledge_base_id: knowledgeBaseId,
          name: data.name,
          description: data.description,
          customer_type: customerType,
          is_active: true,
        })
        .select()
        .single();

      if (configError) throw configError;

      // 根据客户类型创建对应的配置文件
      if (customerType === 'B2B') {
        const { error: b2bError } = await supabase
          .from('icp_b2b_profiles')
          .insert({
            icp_configuration_id: icpConfig.id,
            ...data.profile,
          });
        if (b2bError) throw b2bError;
      } else {
        const { error: b2cError } = await supabase
          .from('icp_b2c_profiles')
          .insert({
            icp_configuration_id: icpConfig.id,
            ...data.profile,
          });
        if (b2cError) throw b2cError;
      }

      toast({
        title: '成功',
        description: 'ICP配置创建成功',
      });

      // 重置状态
      setStep('template');
      setSelectedTemplate(null);
      onSuccess();
    } catch (error) {
      console.error('Error creating ICP:', error);
      toast({
        title: '错误',
        description: '创建ICP失败',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    setStep('template');
    setSelectedTemplate(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            {step === 'form' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <DialogTitle>
                {step === 'template' ? '创建理想客户画像' : `配置${selectedTemplate?.name}`}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        {step === 'template' && (
          <Tabs value={customerType} onValueChange={(value: 'B2B' | 'B2C') => setCustomerType(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="B2B">B2B企业客户</TabsTrigger>
              <TabsTrigger value="B2C">B2C消费者客户</TabsTrigger>
            </TabsList>
            
            <TabsContent value="B2B" className="mt-0">
              <ICPTemplateSelector 
                onSelect={handleTemplateSelect}
                selectedType="B2B"
              />
            </TabsContent>
            
            <TabsContent value="B2C" className="mt-0">
              <ICPTemplateSelector 
                onSelect={handleTemplateSelect}
                selectedType="B2C"
              />
            </TabsContent>
          </Tabs>
        )}

        {step === 'form' && selectedTemplate && (
          <div className="mt-4">
            {customerType === 'B2B' ? (
              <ICPB2BForm 
                template={selectedTemplate}
                onSubmit={handleFormSuccess}
                onCancel={handleBack}
              />
            ) : (
              <ICPB2CForm 
                template={selectedTemplate}
                onSubmit={handleFormSuccess}
                onCancel={handleBack}
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};