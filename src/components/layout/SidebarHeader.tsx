
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Zap } from 'lucide-react';
import { SidebarHeader } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

const AppSidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
  return (
    <SidebarHeader className="p-4 border-b border-gray-100">
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
  );
};

export default AppSidebarHeader;
