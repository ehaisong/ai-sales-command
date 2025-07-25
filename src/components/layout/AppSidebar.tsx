
import React from 'react';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import AppSidebarHeader from './SidebarHeader';
import SidebarMenuContent from './SidebarMenuContent';
import AppSidebarFooter from './SidebarFooter';

const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="w-60 bg-white border-r border-gray-200 shadow-sm">
      <AppSidebarHeader isCollapsed={isCollapsed} />
      <SidebarMenuContent isCollapsed={isCollapsed} />
      <AppSidebarFooter isCollapsed={isCollapsed} />
    </Sidebar>
  );
};

export default AppSidebar;
