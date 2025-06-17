import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Save, Building2, Globe, Phone, Mail, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
}

const BrandProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 基本信息 - updated default logo
  const [logo, setLogo] = useState<string | null>('/lovable-uploads/0c4b0e2b-73dc-424b-9a7b-90b7fc90e3ab.png');
  const [brandName, setBrandName] = useState('我的品牌');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  
  // 联系信息
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  // 产品列表
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: '示例产品1',
      category: '电子产品',
      price: '¥999',
      description: '这是一个示例产品描述'
    },
    {
      id: '2',
      name: '示例产品2',
      category: '服装',
      price: '¥299',
      description: '这是另一个示例产品描述'
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "品牌资料已更新",
    });
  };

  const handleAddProduct = () => {
    if (newProduct.name.trim()) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', category: '', price: '', description: '' });
      setShowAddProduct(false);
      toast({
        title: "添加成功",
        description: "产品已添加到列表",
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "删除成功",
      description: "产品已从列表中删除",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/ai-agent/knowledge')}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>
        <h1 className="text-3xl font-bold">品牌资料</h1>
        <p className="text-muted-foreground mt-1">管理您的品牌基本信息、联系方式和产品列表</p>
      </div>

      <div className="space-y-6">
        {/* 基本信息卡片 - 包含Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              基本信息
            </CardTitle>
            <CardDescription>
              设置您的品牌基本信息和标识
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              {/* 左侧Logo上传 */}
              <div className="md:col-span-1 flex flex-col items-center space-y-4">
                <div className="text-center">
                  <Label className="text-sm font-medium mb-2 block">品牌Logo</Label>
                  <ImageUpload value={logo} onChange={setLogo} />
                  <p className="text-xs text-muted-foreground mt-2">
                    支持 JPG、PNG 格式<br/>建议尺寸 200x200px
                  </p>
                </div>
              </div>

              {/* 右侧表单信息 */}
              <div className="md:col-span-3 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Label htmlFor="companyName">公司名称</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="请输入公司全称"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="contactPerson">联系人</Label>
                    <Input
                      id="contactPerson"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="请输入主要联系人姓名"
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
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>联系信息</CardTitle>
            <CardDescription>
              设置品牌的联系方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
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
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 产品列表卡片 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>产品列表</CardTitle>
                <CardDescription>
                  管理您的产品信息
                </CardDescription>
              </div>
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加产品
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* 添加产品表单 */}
            {showAddProduct && (
              <div className="mb-6 p-4 border rounded-lg bg-muted/30">
                <h4 className="font-medium mb-4">添加新产品</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="productName">产品名称</Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="请输入产品名称"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productCategory">产品类别</Label>
                    <Input
                      id="productCategory"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      placeholder="请输入产品类别"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productPrice">价格</Label>
                    <Input
                      id="productPrice"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="请输入价格"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="productDescription">产品描述</Label>
                    <Input
                      id="productDescription"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="请输入产品描述"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddProduct}>确认添加</Button>
                  <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                    取消
                  </Button>
                </div>
              </div>
            )}

            {/* 产品列表表格 */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>产品名称</TableHead>
                    <TableHead>类别</TableHead>
                    <TableHead>价格</TableHead>
                    <TableHead>描述</TableHead>
                    <TableHead className="w-[100px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        暂无产品信息，点击"添加产品"开始添加
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="mr-2 h-4 w-4" />
            保存品牌资料
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandProfilePage;
