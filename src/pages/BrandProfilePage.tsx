
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Building2, Globe, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';

const BrandProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [logo, setLogo] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('我的品牌');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [slogan, setSlogan] = useState('');

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "品牌资料已更新",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ai-agent/knowledge')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <h1 className="text-3xl font-bold">品牌资料</h1>
        </div>
        <p className="text-muted-foreground">管理您的品牌基本信息和联系方式</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* 品牌Logo上传 */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              品牌Logo
            </CardTitle>
            <CardDescription>
              上传您的品牌标识
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center">
              <ImageUpload value={logo} onChange={setLogo} />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                支持 JPG、PNG 格式，建议尺寸 200x200px
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 品牌基本信息 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>
                设置您的品牌基本信息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="brandName">品牌名称</Label>
                <Input
                  id="brandName"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="请输入品牌名称"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">所属行业</Label>
                <Input
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="如：科技、零售、服务业等"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slogan">品牌口号</Label>
                <Input
                  id="slogan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="请输入品牌口号或标语"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">品牌描述</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请描述您的品牌特色、产品服务等"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* 联系信息 */}
          <Card>
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
              <CardDescription>
                设置品牌的联系方式
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  官方网站
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  联系邮箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  联系电话
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入联系电话"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">地址</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="请输入品牌地址"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="mr-2 h-4 w-4" />
              保存品牌资料
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfilePage;
