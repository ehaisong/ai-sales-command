
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { menuItems, MenuItem } from '@/config/menuItems';

interface SidebarMenuContentProps {
  isCollapsed: boolean;
}

const SidebarMenuContent = ({ isCollapsed }: SidebarMenuContentProps) => {
  const location = useLocation();

  return (
    <SidebarContent className="bg-white py-4 px-0">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item: MenuItem) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex w-full items-center justify-start text-left py-3 px-0 hover:bg-gray-50 transition-colors text-base font-medium min-h-[44px]">
                        <item.icon className="ml-2 mr-3 h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left text-base font-medium">{item.title}</span>
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
                                className="text-left justify-start pl-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center text-sm font-medium min-h-[40px]"
                              >
                                <Link to={subItem.url} className="flex items-center">
                                  {subItem.icon && (
                                    <subItem.icon className="mr-3 h-4 w-4 flex-shrink-0 opacity-70" />
                                  )}
                                  <span className="text-left text-sm">{subItem.title}</span>
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
                    className="flex w-full items-center justify-start text-left py-3 px-0 hover:bg-gray-50 transition-colors text-base font-medium min-h-[44px]"
                  >
                    <Link to={item.url!}>
                      <item.icon className="ml-2 mr-3 h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="text-left text-base font-medium">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarMenuContent;
