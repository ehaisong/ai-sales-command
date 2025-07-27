
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarFooter } from '@/components/ui/sidebar';
import { User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const AppSidebarFooter = ({ isCollapsed }: SidebarFooterProps) => {
  return (
    <SidebarFooter className="p-3 border-t border-sidebar-border bg-sidebar-background">
      {!isCollapsed ? (
        <>
          <Link to="/profile" className="flex items-center space-x-2 mb-2 hover:bg-sidebar-accent rounded-lg p-2 transition-colors">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">张三</div>
              <div className="text-xs text-muted-foreground">科技有限公司</div>
            </div>
          </Link>
          <Link to="/settings">
            <Button size="sm" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              设置
            </Button>
          </Link>
        </>
      ) : (
        <Link to="/profile" className="flex justify-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
            <User className="h-4 w-4 text-white" />
          </div>
        </Link>
      )}
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
