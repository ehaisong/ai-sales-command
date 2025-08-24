import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Users, Sparkles, FileText } from 'lucide-react';

interface ICPTemplate {
  id: string;
  name: string;
  description: string;
  type: 'B2B' | 'B2C';
  icon: any;
  color: string;
}

const icpTemplates: ICPTemplate[] = [
  {
    id: 'b2b-enterprise',
    name: '企业级客户',
    description: '面向大型企业的B2B客户画像，关注决策链和采购流程',
    type: 'B2B',
    icon: Building2,
    color: 'text-blue-600',
  },
  {
    id: 'b2b-startup',
    name: '初创公司',
    description: '面向创业公司和小型团队的B2B客户画像',
    type: 'B2B',
    icon: Sparkles,
    color: 'text-purple-600',
  },
  {
    id: 'b2c-consumer',
    name: '消费者客户',
    description: '面向个人消费者的B2C客户画像，关注生活方式和偏好',
    type: 'B2C',
    icon: Users,
    color: 'text-green-600',
  },
  {
    id: 'b2c-premium',
    name: '高端消费者',
    description: '面向高端消费群体的B2C客户画像，关注品质和体验',
    type: 'B2C',
    icon: Sparkles,
    color: 'text-orange-600',
  },
  {
    id: 'custom',
    name: '自定义配置',
    description: '从空白开始创建完全自定义的客户画像',
    type: 'B2B',
    icon: FileText,
    color: 'text-gray-600',
  },
];

interface ICPTemplateSelectorProps {
  onSelect: (template: ICPTemplate) => void;
  selectedType?: 'B2B' | 'B2C';
}

export const ICPTemplateSelector = ({ onSelect, selectedType }: ICPTemplateSelectorProps) => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const filteredTemplates = selectedType 
    ? icpTemplates.filter(template => template.type === selectedType || template.id === 'custom')
    : icpTemplates;

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">选择ICP模板</h3>
        <p className="text-sm text-muted-foreground">
          选择一个预设模板来快速开始，或创建自定义配置
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          const isHovered = hoveredTemplate === template.id;
          
          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 border-2 ${
                isHovered 
                  ? 'border-primary shadow-lg scale-[1.02]' 
                  : 'border-border hover:border-primary/50'
              }`}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              onClick={() => onSelect(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-secondary ${template.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${
                        template.type === 'B2B' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {template.type}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground">
          选择模板后，您可以根据具体需求进行个性化调整
        </p>
      </div>
    </div>
  );
};