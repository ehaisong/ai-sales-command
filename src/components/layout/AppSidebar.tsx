import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  Home, 
  MessageSquare, 
  Users, 
  User, 
  Share, 
  CreditCard,
  ChevronRight,
  Wrench,
  ChevronDown,
  Zap,
  TestTube
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
        title: "品牌知识库",
        url: "/ai-agent/knowledge",
      },
      {
        title: "设置",
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
        url: "/brand/social-media",
      },
      {
        title: "自动建站霸屏",
        url: "/brand/seo",
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
    title: "测试模块",
    url: "/test",
    icon: TestTube,
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="w-64 bg-white border-r border-gray-200">
      <SidebarHeader className="p-4 border-b border-gray-100">
        {/* Logo and Brand Section */}
        <div className="flex items-center space-x-3">
          {!isCollapsed ? (
            <>
              <img 
                src="/lovable-uploads/a6b20fef-de43-4809-b7fc-a1d7b088160d.png" 
                alt="思拓外贸助手" 
                className="h-8 w-auto object-contain"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <span className="font-medium">我的品牌</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <span>我的品牌</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>+ 添加新品牌</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex w-full items-center justify-start text-left p-2 hover:bg-gray-50 transition-colors">
                          <item.icon className="ml-4 mr-3 h-4 w-4 flex-shrink-0" />
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
                                  className="text-left justify-start pl-11 py-2 hover:bg-gray-50 transition-colors"
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
                      className="flex w-full items-center justify-start text-left p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Link to={item.url}>
                        <item.icon className="ml-4 mr-3 h-4 w-4 flex-shrink-0" />
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

      <SidebarFooter className="p-4 border-t border-gray-100 bg-white">
        {!isCollapsed ? (
          <>
            <Link to="/profile" className="flex items-center space-x-3 mb-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">张三</div>
                <div className="text-xs text-muted-foreground">剩余积分: 1,280</div>
              </div>
            </Link>
            <Button size="sm" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              充值积分
            </Button>
          </>
        ) : (
          <Link to="/profile" className="flex justify-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <User className="h-4 w-4 text-white" />
            </div>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
