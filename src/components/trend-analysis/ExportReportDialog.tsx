import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText, Check } from "lucide-react";

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: string[];
}

const ExportReportDialog = ({ open, onOpenChange, selectedProducts }: ExportReportDialogProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    format: "pdf",
    sections: {
      summary: true,
      products: true,
      analysis: true,
      recommendations: true
    },
    dateRange: "30days"
  });

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
        // 模拟下载
        const link = document.createElement('a');
        link.href = '#';
        link.download = `trend-analysis-report.${exportSettings.format}`;
        link.click();
      }, 3000);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="format">导出格式</Label>
              <Select value={exportSettings.format} onValueChange={(value) => 
                setExportSettings(prev => ({ ...prev, format: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF 报告</SelectItem>
                  <SelectItem value="excel">Excel 表格</SelectItem>
                  <SelectItem value="csv">CSV 数据</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateRange">数据时间范围</Label>
              <Select value={exportSettings.dateRange} onValueChange={(value) => 
                setExportSettings(prev => ({ ...prev, dateRange: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">近7天</SelectItem>
                  <SelectItem value="30days">近30天</SelectItem>
                  <SelectItem value="90days">近90天</SelectItem>
                  <SelectItem value="custom">自定义范围</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>报告内容</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="summary"
                    checked={exportSettings.sections.summary}
                    onCheckedChange={(checked) => 
                      setExportSettings(prev => ({ 
                        ...prev, 
                        sections: { ...prev.sections, summary: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="summary">执行摘要</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="products"
                    checked={exportSettings.sections.products}
                    onCheckedChange={(checked) => 
                      setExportSettings(prev => ({ 
                        ...prev, 
                        sections: { ...prev.sections, products: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="products">商品详细数据</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="analysis"
                    checked={exportSettings.sections.analysis}
                    onCheckedChange={(checked) => 
                      setExportSettings(prev => ({ 
                        ...prev, 
                        sections: { ...prev.sections, analysis: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="analysis">趋势分析图表</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="recommendations"
                    checked={exportSettings.sections.recommendations}
                    onCheckedChange={(checked) => 
                      setExportSettings(prev => ({ 
                        ...prev, 
                        sections: { ...prev.sections, recommendations: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="recommendations">AI 建议</Label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">生成报告中</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>正在为 {selectedProducts.length} 个商品生成 {exportSettings.format.toUpperCase()} 报告...</p>
                <p>预计需要 10-30 秒</p>
              </div>
              {isProcessing && (
                <div className="mt-4">
                  <Progress value={66} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">正在分析数据...</p>
                </div>
              )}
            </div>
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
            <Download className="w-5 h-5" />
            导出完整报告
          </DialogTitle>
          <DialogDescription>
            为选中的 {selectedProducts.length} 个商品生成详细分析报告
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
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  生成中...
                </>
              ) : step === totalSteps ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  开始生成
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

export default ExportReportDialog;