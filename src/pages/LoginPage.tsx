import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, Sparkles, Globe, TrendingUp, Users, BarChart3 } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast({ title: '密码不匹配', description: '请确认两次输入的密码一致', variant: 'destructive' });
      return;
    }
    toast({
      title: isLogin ? '登录成功' : '注册成功',
      description: isLogin ? '欢迎回来！' : '账户创建成功，正在跳转...',
    });
    setTimeout(() => navigate('/'), 1000);
  };

  const handleGoogleLogin = () => {
    toast({ title: 'Google 登录', description: '正在跳转到 Google 授权页面...' });
    setTimeout(() => navigate('/'), 1500);
  };

  const features = [
    { icon: Globe, title: '全球市场覆盖', desc: '覆盖28个国家和地区的贸易数据' },
    { icon: TrendingUp, title: 'AI智能分析', desc: '87%精准匹配度的客户发现系统' },
    { icon: Users, title: '客户管理', desc: '智能CRM全渠道客户关系管理' },
    { icon: BarChart3, title: '数据洞察', desc: '实时市场趋势分析与竞品监控' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌展示 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[hsl(240,100%,70%)] via-[hsl(245,83%,68%)] to-[hsl(260,80%,55%)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <img src="/favicon.gif" alt="Logo" className="w-12 h-12 rounded-xl" />
            <h1 className="text-3xl font-bold">智能外贸助手</h1>
          </div>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            AI驱动的智能外贸营销自动化平台<br />
            助您轻松开拓全球市场
          </p>
          <div className="grid grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <f.icon className="w-8 h-8 mb-3 text-white/90" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm text-white/60">
            <span>🏢 10,000+ 企业信赖</span>
            <span>🌍 28个国家覆盖</span>
            <span>⭐ 4.9/5 用户评分</span>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex items-center justify-center bg-secondary p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <img src="/favicon.gif" alt="Logo" className="w-10 h-10 rounded-xl" />
            <h1 className="text-2xl font-bold text-foreground">智能外贸助手</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? '欢迎回来' : '创建账户'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin ? '登录您的账户继续使用' : '注册免费体验AI外贸营销'}
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              {/* Google Login */}
              <Button
                variant="outline"
                className="w-full h-12 text-base font-medium mb-6 hover:bg-muted"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                使用 Google 账号{isLogin ? '登录' : '注册'}
              </Button>

              <div className="flex items-center gap-4 mb-6">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">或</span>
                <Separator className="flex-1" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      placeholder="请输入您的姓名"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱地址</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请输入密码"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">确认密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="再次输入密码"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}
                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-sm text-primary hover:underline">
                      忘记密码？
                    </button>
                  </div>
                )}
                <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLogin ? '登录' : '创建账户'}
                </Button>
              </form>

              <div className="text-center mt-6">
                <span className="text-sm text-muted-foreground">
                  {isLogin ? '还没有账户？' : '已有账户？'}
                </span>
                <button
                  className="text-sm text-primary font-medium ml-1 hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? '立即注册' : '返回登录'}
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            注册即表示您同意我们的 <span className="text-primary cursor-pointer hover:underline">服务条款</span> 和 <span className="text-primary cursor-pointer hover:underline">隐私政策</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
