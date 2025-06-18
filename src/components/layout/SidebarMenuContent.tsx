
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
    <SidebarContent className="bg-white">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item: MenuItem) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex w-full items-center justify-start text-left px-3 py-3 hover:bg-gray-50 transition-colors font-medium text-gray-800 text-base">
                        <item.icon className="ml-2 mr-4 h-5 w-5 flex-shrink-0 text-gray-600" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left font-medium">{item.title}</span>
                            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-gray-400" />
                          </>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        {/* 视觉分隔线 */}
                        <div className="ml-8 mr-4 mb-1 border-t border-gray-100"></div>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={location.pathname === subItem.url}
                                className={`text-left justify-start pl-10 py-2.5 mx-2 rounded-md transition-all duration-200 flex items-center text-sm font-normal ${
                                  location.pathname === subItem.url 
                                    ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                              >
                                <Link to={subItem.url} className="flex items-center w-full">
                                  {subItem.icon && (
                                    <subItem.icon className={`mr-3 h-4 w-4 flex-shrink-0 ${
                                      location.pathname === subItem.url ? 'text-blue-600' : 'text-gray-400'
                                    }`} />
                                  )}
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
                    className={`flex w-full items-center justify-start text-left px-3 py-3 transition-colors font-medium text-base ${
                      location.pathname === item.url 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Link to={item.url!}>
                      <item.icon className={`ml-2 mr-4 h-5 w-5 flex-shrink-0 ${
                        location.pathname === item.url ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      {!isCollapsed && <span className="text-left font-medium">{item.title}</span>}
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
