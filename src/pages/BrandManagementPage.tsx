import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const BrandManagementPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: '',
    website: '',
    additionalContext: ''
  });

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link 
          to="/" 
          className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回工作台
        </Link>

        {/* 步骤指示器 */}
        <div className="flex items-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              基础信息
            </span>
          </div>
          
          <div className="mx-4 h-px bg-border flex-1 max-w-20" />
          
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              品牌详情
            </span>
          </div>
        </div>

        {/* 表单内容 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground mb-6">基础信息</h1>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brandName" className="text-base font-medium">
                      品牌名称
                    </Label>
                    <Input
                      id="brandName"
                      placeholder="输入品牌名称"
                      value={formData.brandName}
                      onChange={(e) => handleInputChange('brandName', e.target.value)}
                      className="mt-2 h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-base font-medium">
                      网站
                    </Label>
                    <Input
                      id="website"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="mt-2 h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalContext" className="text-base font-medium">
                      附加信息 (可选)
                    </Label>
                    <Textarea
                      id="additionalContext"
                      placeholder="描述您品牌的背景、使命、独特方面，或任何有助于生成更好内容策略的特定信息..."
                      value={formData.additionalContext}
                      onChange={(e) => handleInputChange('additionalContext', e.target.value)}
                      className="mt-2 min-h-[120px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button 
                    onClick={handleNext}
                    className="px-8 h-12 text-base"
                    disabled={!formData.brandName}
                  >
                    下一步
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-foreground mb-6">品牌详情</h1>
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <p>品牌详情页面开发中...</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setCurrentStep(1)}
                  >
                    返回上一步
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandManagementPage;