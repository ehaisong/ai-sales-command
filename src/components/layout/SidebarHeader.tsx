import React from 'react';
import { Zap } from 'lucide-react';
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
                <a href="https://seatob.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  <img alt="智能外贸助手" className="h-10 w-10 object-contain cursor-pointer hover:opacity-80 transition-opacity" src="/lovable-uploads/logo.png" />
                  <span className="text-lg font-bold text-foreground whitespace-nowrap">智能外贸系统</span>
                </a>
              </> : <div className="w-12 h-12 flex items-center justify-center">
                <img alt="智能外贸助手" className="h-10 w-10 object-contain" src="/lovable-uploads/logo.png" />
              </div>}
      </div>
    </SidebarHeader>;
};
export default AppSidebarHeader;