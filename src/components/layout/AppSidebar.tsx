
import React from 'react';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import AppSidebarHeader from './SidebarHeader';
import SidebarMenuContent from './SidebarMenuContent';
import AppSidebarFooter from './SidebarFooter';

const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} bg-sidebar-background border-r border-sidebar-border shadow-sm transition-all duration-300`}>
      <AppSidebarHeader isCollapsed={isCollapsed} />
      <SidebarMenuContent isCollapsed={isCollapsed} />
      <AppSidebarFooter isCollapsed={isCollapsed} />
    </Sidebar>
  );
};

export default AppSidebar;
