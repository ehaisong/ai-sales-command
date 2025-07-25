import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Search, Bell, HelpCircle, Share, ChevronDown, User, Settings, CreditCard, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
const TopNavbar = () => {
  return <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between w-full py-[34px]">
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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        {/* 帮助 */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* 分享邀请 */}
        <Button variant="ghost" size="icon">
          <Share className="h-5 w-5" />
        </Button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium">张三</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">科技有限公司</div>
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
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>设置</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
};
export default TopNavbar;