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
                <a href="https://seatob.com" target="_blank" rel="noopener noreferrer">
                  <img alt="智能外贸助手" className="h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity" src="/lovable-uploads/logo.png" />
                </a>
              </> : <div className="w-12 h-12 flex items-center justify-center">
                <img alt="智能外贸助手" className="h-10 w-10 object-contain" src="/lovable-uploads/logo.png" />
              </div>}
      </div>
    </SidebarHeader>;
};
export default AppSidebarHeader;