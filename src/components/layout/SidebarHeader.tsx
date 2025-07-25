import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ChevronDown, Zap } from 'lucide-react';
import { SidebarHeader } from '@/components/ui/sidebar';
interface SidebarHeaderProps {
  isCollapsed: boolean;
}
const AppSidebarHeader = ({
  isCollapsed
}: SidebarHeaderProps) => {
  return <SidebarHeader className="p-6 border-b border-gray-100">
      <div className="flex items-center space-x-4">
        {!isCollapsed ? <>
            <img alt="思拓外贸助手" className="h-12 w-auto object-contain" src="/lovable-uploads/515beaa6-06a7-4d91-85dd-09233ccbf7d0.png" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="flex items-center space-x-2 text-base font-semibold">
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
          </> : <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="h-7 w-7 text-white" />
          </div>}
      </div>
    </SidebarHeader>;
};
export default AppSidebarHeader;