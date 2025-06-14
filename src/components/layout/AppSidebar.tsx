
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  MessageSquare, 
  Users, 
  User, 
  Share, 
  Settings,
  CreditCard,
  ChevronRight,
  Wrench,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
  Zap
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSidebar } from '@/components/ui/sidebar';

const menuItems = [
  {
    title: "首页",
    url: "/",
    icon: Home,
  },
  {
    title: "营销对话",
    icon: MessageSquare,
    items: [
      {
        title: "电子邮件",
        url: "/marketing/email",
      },
      {
        title: "WhatsApp",
        url: "/marketing/whatsapp",
      },
    ],
  },
  {
    title: "客户管理",
    url: "/customers",
    icon: Users,
  },
  {
    title: "AI业务员",
    icon: User,
    items: [
      {
        title: "知识大脑",
        url: "/ai-agent/knowledge",
      },
      {
        title: "设置信息",
        url: "/ai-agent/settings",
      },
    ],
  },
  {
    title: "品牌建设",
    icon: Share,
    items: [
      {
        title: "社交媒体",
        url: "/brand/social",
      },
      {
        title: "SEO",
        url: "/brand/seo",
      },
      {
        title: "流量加热",
        url: "/brand/traffic",
      },
    ],
  },
  {
    title: "营销工具",
    icon: Wrench,
    items: [
      {
        title: "爆款趋势",
        url: "/tools/trends",
      },
      {
        title: "落地页",
        url: "/tools/landing",
      },
      {
        title: "网红",
        url: "/tools/influencer",
      },
      {
        title: "广告助手",
        url: "/tools/ads",
      },
      {
        title: "竞品监控",
        url: "/tools/competitor",
      },
      {
        title: "流量加热",
        url: "/tools/traffic-boost",
      },
    ],
  },
  {
    title: "设置",
    url: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="bg-white border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {isCollapsed ? (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
            ) : (
              <img 
                src="/lovable-uploads/a6b20fef-de43-4809-b7fc-a1d7b088160d.png" 
                alt="思拓外贸助手" 
                className="h-8 w-auto object-contain"
              />
            )}
          </div>
          
          {/* Sidebar Toggle */}
          <div className="flex items-center space-x-2">
            <SidebarTrigger className="h-6 w-6" />
            <Menu className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Search and Brand Selection - Only show when expanded */}
        {!isCollapsed && (
          <div className="mt-4 space-y-3">
            {/* Brand Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="font-medium">我的品牌</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <span>我的品牌</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>+ 添加新品牌</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索客户、产品或功能..."
                className="pl-10 bg-gray-50"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className="flex w-full items-center justify-start text-left p-2 hover:bg-gray-100 transition-colors"
                          tooltip={isCollapsed ? item.title : undefined}
                        >
                          <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left">{item.title}</span>
                              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </>
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton 
                                  asChild
                                  isActive={location.pathname === subItem.url}
                                  className="text-left justify-start pl-8 py-2 hover:bg-gray-100 transition-colors"
                                >
                                  <Link to={subItem.url}>
                                    <span className="text-left">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                      className="flex w-full items-center justify-start text-left p-2 hover:bg-gray-100 transition-colors"
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <Link to={item.url}>
                        <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span className="text-left">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        {!isCollapsed ? (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">张三</div>
                <div className="text-xs text-muted-foreground">剩余积分: 1,280</div>
              </div>
            </div>
            <Button size="sm" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              充值积分
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <Button size="icon" className="w-8 h-8">
              <CreditCard className="h-4 w-4" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
