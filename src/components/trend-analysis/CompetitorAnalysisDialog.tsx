import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Check, AlertCircle } from "lucide-react";

interface CompetitorAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: string[];
}

const CompetitorAnalysisDialog = ({ open, onOpenChange, selectedProducts }: CompetitorAnalysisDialogProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisSettings, setAnalysisSettings] = useState({
    competitors: [] as string[],
    analysisType: "pricing",
    platforms: {
      amazon: true,
      ebay: false,
      shopify: true
    },
    customCompetitor: ""
  });

  const [suggestedCompetitors] = useState([
    "Apple AirPods Pro",
    "Sony WH-1000XM4", 
    "Bose QuietComfort",
    "Samsung Galaxy Buds",
    "Xiaomi Redmi Buds"
  ]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(1);
        onOpenChange(false);
      }, 4000);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleCompetitor = (competitor: string) => {
    setAnalysisSettings(prev => ({
      ...prev,
      competitors: prev.competitors.includes(competitor)
        ? prev.competitors.filter(c => c !== competitor)
        : [...prev.competitors, competitor]
    }));
  };

  const addCustomCompetitor = () => {
    if (analysisSettings.customCompetitor && !analysisSettings.competitors.includes(analysisSettings.customCompetitor)) {
      setAnalysisSettings(prev => ({
        ...prev,
        competitors: [...prev.competitors, prev.customCompetitor],
        customCompetitor: ""
      }));
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>选择竞品</Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {suggestedCompetitors.map((competitor) => (
                  <div key={competitor} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={analysisSettings.competitors.includes(competitor)}
                      onCheckedChange={() => toggleCompetitor(competitor)}
                    />
                    <Label className="flex-1 cursor-pointer">{competitor}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="添加自定义竞品"
                value={analysisSettings.customCompetitor}
                onChange={(e) => setAnalysisSettings(prev => ({ ...prev, customCompetitor: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addCustomCompetitor()}
              />
              <Button variant="outline" size="sm" onClick={addCustomCompetitor}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
            {analysisSettings.competitors.length > 0 && (
              <div className="space-y-2">
                <Label>已选择的竞品:</Label>
                <div className="flex flex-wrap gap-2">
                  {analysisSettings.competitors.map((competitor) => (
                    <Badge key={competitor} variant="secondary" className="cursor-pointer" 
                           onClick={() => toggleCompetitor(competitor)}>
                      {competitor} ×
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="analysisType">分析类型</Label>
              <Select value={analysisSettings.analysisType} onValueChange={(value) => 
                setAnalysisSettings(prev => ({ ...prev, analysisType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pricing">价格对比</SelectItem>
                  <SelectItem value="features">功能对比</SelectItem>
                  <SelectItem value="reviews">评价分析</SelectItem>
                  <SelectItem value="comprehensive">综合分析</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label>分析平台</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={analysisSettings.platforms.amazon}
                    onCheckedChange={(checked) => 
                      setAnalysisSettings(prev => ({ 
                        ...prev, 
                        platforms: { ...prev.platforms, amazon: checked as boolean }
                      }))}
                  />
                  <Label>Amazon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={analysisSettings.platforms.ebay}
                    onCheckedChange={(checked) => 
                      setAnalysisSettings(prev => ({ 
                        ...prev, 
                        platforms: { ...prev.platforms, ebay: checked as boolean }
                      }))}
                  />
                  <Label>eBay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    checked={analysisSettings.platforms.shopify}
                    onCheckedChange={(checked) => 
                      setAnalysisSettings(prev => ({ 
                        ...prev, 
                        platforms: { ...prev.platforms, shopify: checked as boolean }
                      }))}
                  />
                  <Label>Shopify</Label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">正在分析竞品</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>分析商品: {selectedProducts.length} 个</p>
                <p>对比竞品: {analysisSettings.competitors.length} 个</p>
                <p>分析类型: {analysisSettings.analysisType === 'pricing' ? '价格对比' : 
                          analysisSettings.analysisType === 'features' ? '功能对比' : 
                          analysisSettings.analysisType === 'reviews' ? '评价分析' : '综合分析'}</p>
              </div>
              {isProcessing && (
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">正在收集竞品数据...</p>
                </div>
              )}
            </div>
            {!isProcessing && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">预估分析时间: 2-5 分钟</p>
                    <p>分析完成后将自动跳转到结果页面</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            竞品对比分析
          </DialogTitle>
          <DialogDescription>
            对选中的 {selectedProducts.length} 个商品进行竞品分析
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>步骤 {step} / {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {renderStepContent()}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={step === 1 || isProcessing}
            >
              上一步
            </Button>
            <Button 
              onClick={handleNext}
              disabled={isProcessing || (step === 1 && analysisSettings.competitors.length === 0)}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  分析中...
                </>
              ) : step === totalSteps ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  开始分析
                </>
              ) : (
                "下一步"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitorAnalysisDialog;