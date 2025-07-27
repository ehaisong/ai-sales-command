import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Check } from "lucide-react";

interface TrendAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProducts: string[];
}

const TrendAlertDialog = ({ open, onOpenChange, selectedProducts }: TrendAlertDialogProps) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    threshold: "10",
    frequency: "daily",
    email: "",
    channels: {
      email: true,
      sms: false,
      push: true
    }
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
      }, 2000);
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
              <Label htmlFor="threshold">趋势变化阈值 (%)</Label>
              <Select value={alertSettings.threshold} onValueChange={(value) => 
                setAlertSettings(prev => ({ ...prev, threshold: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frequency">提醒频率</Label>
              <Select value={alertSettings.frequency} onValueChange={(value) => 
                setAlertSettings(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">实时</SelectItem>
                  <SelectItem value="daily">每日</SelectItem>
                  <SelectItem value="weekly">每周</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">通知邮箱</Label>
              <Input 
                id="email"
                type="email"
                placeholder="输入邮箱地址"
                value={alertSettings.email}
                onChange={(e) => setAlertSettings(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              <Label>通知渠道</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="email-channel"
                    checked={alertSettings.channels.email}
                    onCheckedChange={(checked) => 
                      setAlertSettings(prev => ({ 
                        ...prev, 
                        channels: { ...prev.channels, email: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="email-channel">邮件通知</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sms-channel"
                    checked={alertSettings.channels.sms}
                    onCheckedChange={(checked) => 
                      setAlertSettings(prev => ({ 
                        ...prev, 
                        channels: { ...prev.channels, sms: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="sms-channel">短信通知</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="push-channel"
                    checked={alertSettings.channels.push}
                    onCheckedChange={(checked) => 
                      setAlertSettings(prev => ({ 
                        ...prev, 
                        channels: { ...prev.channels, push: checked as boolean }
                      }))}
                  />
                  <Label htmlFor="push-channel">推送通知</Label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">确认设置</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>监控商品数量: {selectedProducts.length}</p>
                <p>阈值: {alertSettings.threshold}%</p>
                <p>频率: {alertSettings.frequency === 'daily' ? '每日' : alertSettings.frequency === 'weekly' ? '每周' : '实时'}</p>
                <p>通知邮箱: {alertSettings.email}</p>
              </div>
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
            <Bell className="w-5 h-5" />
            设置趋势提醒
          </DialogTitle>
          <DialogDescription>
            为选中的 {selectedProducts.length} 个商品设置趋势变化提醒
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
                  设置中...
                </>
              ) : step === totalSteps ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  确认设置
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

export default TrendAlertDialog;