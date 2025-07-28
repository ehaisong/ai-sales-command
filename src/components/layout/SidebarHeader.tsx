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
                <img alt="思拓出海" className="h-12 w-auto object-contain" src="/lovable-uploads/be55e235-0b1c-45c0-b936-f0587eb24b04.png" />
              </> : <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-7 w-7 text-white" />
              </div>}
      </div>
    </SidebarHeader>;
};
export default AppSidebarHeader;