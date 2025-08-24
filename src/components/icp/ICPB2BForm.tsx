import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface ICPTemplate {
  id: string;
  name: string;
  description: string;
  type: 'B2B' | 'B2C';
}

interface ICPB2BFormProps {
  template: ICPTemplate;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ICPB2BForm = ({ template, onSubmit, onCancel }: ICPB2BFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profile: {
      industry: '',
      sub_industry: '',
      company_size_min: '',
      company_size_max: '',
      annual_revenue_min: '',
      annual_revenue_max: '',
      hq_location: '',
      operating_regions: [] as string[],
      business_model: '',
      technology_maturity: '',
      growth_stage: '',
      company_age: '',
      ownership_type: '',
      job_titles: [] as string[],
      seniority_levels: [] as string[],
      departments: [] as string[],
      buying_power: '',
      pain_points: [] as string[],
      preferred_channels: [] as string[],
      tech_stack: [] as string[],
      online_presence: '',
      recent_news: '',
      competitor_overlap: [] as string[],
      hiring_trends: false,
      adoption_intent_signals: false,
    }
  });

  const [newTag, setNewTag] = useState('');
  const [currentField, setCurrentField] = useState<string>('');

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev.profile],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addTag = (field: string) => {
    if (newTag.trim()) {
      const currentArray = formData.profile[field as keyof typeof formData.profile] as string[] || [];
      if (!currentArray.includes(newTag.trim())) {
        handleInputChange(`profile.${field}`, [...currentArray, newTag.trim()]);
        setNewTag('');
        setCurrentField('');
      }
    }
  };

  const removeTag = (field: string, tagToRemove: string) => {
    const currentArray = formData.profile[field as keyof typeof formData.profile] as string[] || [];
    handleInputChange(`profile.${field}`, currentArray.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderTagInput = (field: string, label: string, placeholder: string) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {(formData.profile[field as keyof typeof formData.profile] as string[] || []).map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X 
              className="h-3 w-3 cursor-pointer" 
              onClick={() => removeTag(field, tag)}
            />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={currentField === field ? newTag : ''}
          onChange={(e) => {
            setNewTag(e.target.value);
            setCurrentField(field);
          }}
          placeholder={placeholder}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag(field);
            }
          }}
        />
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => addTag(field)}
          disabled={!newTag.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            基本信息
          </CardTitle>
          <CardDescription>
            设置ICP配置的基本信息和标识
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">配置名称 *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="例如：企业级SaaS客户"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="描述这个ICP配置的特点和用途..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>公司信息</CardTitle>
          <CardDescription>定义目标公司的基本特征</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">行业</Label>
              <Select value={formData.profile.industry} onValueChange={(value) => handleInputChange('profile.industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">科技</SelectItem>
                  <SelectItem value="finance">金融</SelectItem>
                  <SelectItem value="healthcare">医疗健康</SelectItem>
                  <SelectItem value="education">教育</SelectItem>
                  <SelectItem value="manufacturing">制造业</SelectItem>
                  <SelectItem value="retail">零售</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sub_industry">细分行业</Label>
              <Input
                id="sub_industry"
                value={formData.profile.sub_industry}
                onChange={(e) => handleInputChange('profile.sub_industry', e.target.value)}
                placeholder="例如：企业软件"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_size_min">公司规模（最小）</Label>
              <Input
                id="company_size_min"
                type="number"
                value={formData.profile.company_size_min}
                onChange={(e) => handleInputChange('profile.company_size_min', e.target.value)}
                placeholder="最少员工数"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_size_max">公司规模（最大）</Label>
              <Input
                id="company_size_max"
                type="number"
                value={formData.profile.company_size_max}
                onChange={(e) => handleInputChange('profile.company_size_max', e.target.value)}
                placeholder="最多员工数"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="annual_revenue_min">年营收（最小）</Label>
              <Input
                id="annual_revenue_min"
                type="number"
                value={formData.profile.annual_revenue_min}
                onChange={(e) => handleInputChange('profile.annual_revenue_min', e.target.value)}
                placeholder="最小年营收（万元）"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual_revenue_max">年营收（最大）</Label>
              <Input
                id="annual_revenue_max"
                type="number"
                value={formData.profile.annual_revenue_max}
                onChange={(e) => handleInputChange('profile.annual_revenue_max', e.target.value)}
                placeholder="最大年营收（万元）"
              />
            </div>
          </div>

          {renderTagInput('operating_regions', '运营区域', '输入区域名称')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>决策者信息</CardTitle>
          <CardDescription>定义目标决策者的特征</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTagInput('job_titles', '职位头衔', '输入职位名称')}
          {renderTagInput('seniority_levels', '资历级别', '例如：总监级别')}
          {renderTagInput('departments', '所属部门', '例如：IT部门')}
          
          <div className="space-y-2">
            <Label htmlFor="buying_power">购买决策权</Label>
            <Select value={formData.profile.buying_power} onValueChange={(value) => handleInputChange('profile.buying_power', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择决策权级别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="decision_maker">最终决策者</SelectItem>
                <SelectItem value="influencer">影响者</SelectItem>
                <SelectItem value="gatekeeper">把关人</SelectItem>
                <SelectItem value="user">使用者</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>业务需求</CardTitle>
          <CardDescription>定义目标客户的痛点和需求</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTagInput('pain_points', '痛点问题', '描述客户面临的问题')}
          {renderTagInput('preferred_channels', '偏好渠道', '例如：线上会议')}
          {renderTagInput('tech_stack', '技术栈', '例如：AWS')}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">
          创建ICP配置
        </Button>
      </div>
    </form>
  );
};