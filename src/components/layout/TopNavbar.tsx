import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, HelpCircle, ChevronDown, User, Settings, CreditCard, Monitor, Building2, Plus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
const TopNavbar = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: '错误',
        description: '登出失败',
        variant: 'destructive',
      });
    }
  };
  return <header className="sticky top-0 z-50 h-14 bg-card border-b border-border px-4 flex items-center justify-between w-full">
      {/* 左侧抽屉控制和DEMO标识 */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Monitor className="h-3 w-3 mr-1" />
          DEMO 演示版
        </Badge>
      </div>

      {/* 中间搜索栏 */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索客户、产品或功能..." className="pl-10 bg-secondary/50" />
        </div>
      </div>

      {/* 右侧快捷操作 */}
      <div className="flex items-center space-x-3">
        {/* 通知 */}
        <NotificationDropdown />

        {/* 帮助 */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* 品牌切换 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <Building2 className="h-4 w-4" />
              <span className="hidden md:inline text-sm">科技有限公司</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">科技有限公司</span>
                <span className="text-xs text-muted-foreground">当前品牌</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>贸易公司</span>
                <span className="text-xs text-muted-foreground">副品牌</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span>电商品牌</span>
                <span className="text-xs text-muted-foreground">电商业务</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/brand-management" className="flex items-center w-full">
                <Plus className="mr-2 h-4 w-4" />
                <span>添加品牌</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>登出</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
};
export default TopNavbar;