import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Shield, Zap, Check, Star, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  { id: 'starter', name: '入门版', credits: 1000, price: 99, perCredit: '0.099', popular: false, features: ['1,000 积分', '基础AI分析', '邮件支持'] },
  { id: 'pro', name: '专业版', credits: 5000, price: 399, perCredit: '0.080', popular: true, features: ['5,000 积分', '高级AI分析', '优先支持', '20%额外赠送'] },
  { id: 'enterprise', name: '企业版', credits: 20000, price: 1299, perCredit: '0.065', popular: false, features: ['20,000 积分', '全部AI功能', '专属客服', '35%额外赠送', 'API接入'] },
];

const CreditsRechargePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentPlan = plans.find(p => p.id === selectedPlan)!;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: '充值成功！',
        description: `已成功充值 ${currentPlan.credits.toLocaleString()} 积分`,
      });
      navigate('/credits');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧：套餐选择 */}
      <div className="flex-1 bg-secondary p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> 返回
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">积分充值</h1>
            <p className="text-muted-foreground">选择适合您的套餐，解锁AI营销全部功能</p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-primary shadow-lg border-primary'
                    : 'hover:shadow-md hover:border-primary/30'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPlan === plan.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedPlan === plan.id && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                          {plan.popular && (
                            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" /> 最受欢迎
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {plan.features.map((f, i) => (
                            <span key={i} className="text-sm text-muted-foreground flex items-center gap-1">
                              <Check className="w-3 h-3 text-green-500" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">¥{plan.price}</div>
                      <div className="text-sm text-muted-foreground">¥{plan.perCredit}/积分</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 积分使用说明 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> 积分使用说明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" /> AI客户分析: 10积分/次</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full" /> 邮件营销: 5积分/封</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-purple-500 rounded-full" /> 流量加热: 10积分/100访问</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-orange-500 rounded-full" /> 竞品监控: 20积分/天</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-pink-500 rounded-full" /> 海关数据: 50积分/查询</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 bg-teal-500 rounded-full" /> SEO优化: 30积分/页面</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 右侧：支付表单 (Stripe风格) */}
      <div className="w-full lg:w-[480px] bg-card border-l border-border p-8 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">安全支付</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">订单确认</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">¥{currentPlan.price}</span>
              <span className="text-muted-foreground">/ {currentPlan.credits.toLocaleString()} 积分</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-5">
            <div className="space-y-2">
              <Label>持卡人姓名</Label>
              <Input
                placeholder="ZHANG SAN"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>卡号</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="4242 4242 4242 4242"
                  className="pl-10"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>有效期</Label>
                <Input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>CVC</Label>
                <Input
                  placeholder="123"
                  maxLength={3}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  处理中...
                </span>
              ) : (
                `支付 ¥${currentPlan.price}`
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <Shield className="w-3 h-3" /> SSL加密
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Lock className="w-3 h-3" /> PCI DSS认证
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3 opacity-40">
            <span className="text-xs font-bold text-foreground">Powered by</span>
            <span className="text-lg font-bold text-[#635BFF]">stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsRechargePage;
