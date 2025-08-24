import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X, Plus } from 'lucide-react';

interface ICPTemplate {
  id: string;
  name: string;
  description: string;
  type: 'B2B' | 'B2C';
}

interface ICPB2CFormProps {
  template: ICPTemplate;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ICPB2CForm = ({ template, onSubmit, onCancel }: ICPB2CFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    profile: {
      age_min: '',
      age_max: '',
      gender: [] as string[],
      income_min: '',
      income_max: '',
      location: [] as string[],
      occupation: [] as string[],
      education_level: [] as string[],
      tech_savviness: '',
      device_preferences: [] as string[],
      preferred_communication: [] as string[],
      shopping_preferences: [] as string[],
      social_media_platforms: [] as string[],
      urban_rural_preference: '',
      interests: [] as string[],
      values: [] as string[],
      lifestyle: [] as string[],
      personality_traits: [] as string[],
      motivations: [] as string[],
      pain_points: [] as string[],
      purchase_behavior: [] as string[],
      digital_engagement: '',
      brand_loyalty: '',
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
          <CardTitle>基本信息</CardTitle>
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
              placeholder="例如：年轻都市消费者"
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
          <CardTitle>人口统计学特征</CardTitle>
          <CardDescription>定义目标消费者的基本人口学信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age_min">年龄范围（最小）</Label>
              <Input
                id="age_min"
                type="number"
                value={formData.profile.age_min}
                onChange={(e) => handleInputChange('profile.age_min', e.target.value)}
                placeholder="最小年龄"
                min="0"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age_max">年龄范围（最大）</Label>
              <Input
                id="age_max"
                type="number"
                value={formData.profile.age_max}
                onChange={(e) => handleInputChange('profile.age_max', e.target.value)}
                placeholder="最大年龄"
                min="0"
                max="120"
              />
            </div>
          </div>

          {renderTagInput('gender', '性别', '例如：男性、女性、其他')}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income_min">收入范围（最小）</Label>
              <Input
                id="income_min"
                type="number"
                value={formData.profile.income_min}
                onChange={(e) => handleInputChange('profile.income_min', e.target.value)}
                placeholder="最小年收入（万元）"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income_max">收入范围（最大）</Label>
              <Input
                id="income_max"
                type="number"
                value={formData.profile.income_max}
                onChange={(e) => handleInputChange('profile.income_max', e.target.value)}
                placeholder="最大年收入（万元）"
              />
            </div>
          </div>

          {renderTagInput('location', '地理位置', '例如：北京、上海')}
          {renderTagInput('occupation', '职业', '例如：软件工程师')}
          {renderTagInput('education_level', '教育水平', '例如：本科、硕士')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>行为特征</CardTitle>
          <CardDescription>定义目标消费者的行为偏好和习惯</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tech_savviness">技术熟练度</Label>
            <Select value={formData.profile.tech_savviness} onValueChange={(value) => handleInputChange('profile.tech_savviness', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择技术熟练度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低（基础使用）</SelectItem>
                <SelectItem value="medium">中等（日常熟练）</SelectItem>
                <SelectItem value="high">高（技术专家）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="digital_engagement">数字化参与度</Label>
            <Select value={formData.profile.digital_engagement} onValueChange={(value) => handleInputChange('profile.digital_engagement', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择数字化参与度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低（偶尔使用）</SelectItem>
                <SelectItem value="medium">中等（定期使用）</SelectItem>
                <SelectItem value="high">高（重度使用）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand_loyalty">品牌忠诚度</Label>
            <Select value={formData.profile.brand_loyalty} onValueChange={(value) => handleInputChange('profile.brand_loyalty', value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择品牌忠诚度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低（经常换品牌）</SelectItem>
                <SelectItem value="medium">中等（有偏好但会尝试）</SelectItem>
                <SelectItem value="high">高（高度忠诚）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderTagInput('device_preferences', '设备偏好', '例如：手机、平板')}
          {renderTagInput('preferred_communication', '偏好沟通方式', '例如：微信、邮件')}
          {renderTagInput('shopping_preferences', '购物偏好', '例如：线上购物、实体店')}
          {renderTagInput('social_media_platforms', '社交媒体平台', '例如：微信、微博')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>心理特征</CardTitle>
          <CardDescription>定义目标消费者的心理特征和动机</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTagInput('interests', '兴趣爱好', '例如：旅行、摄影')}
          {renderTagInput('values', '价值观', '例如：环保、品质')}
          {renderTagInput('lifestyle', '生活方式', '例如：健康生活、快节奏')}
          {renderTagInput('personality_traits', '性格特征', '例如：外向、谨慎')}
          {renderTagInput('motivations', '购买动机', '例如：性价比、品牌认知')}
          {renderTagInput('pain_points', '痛点问题', '描述消费者面临的问题')}
          {renderTagInput('purchase_behavior', '购买行为', '例如：冲动购买、深度调研')}
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