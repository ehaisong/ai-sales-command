
import React from 'react';
import { Button } from "@/components/ui/button";
import { PauseCircle, PlayCircle } from 'lucide-react';
import { PlatformAccount } from '@/types/socialMedia';

interface UnifiedManagementSectionProps {
  allConnectedAccounts: PlatformAccount[];
  allAccountsActive: boolean;
  onToggleAllAccounts: () => void;
}

const UnifiedManagementSection: React.FC<UnifiedManagementSectionProps> = ({
  allConnectedAccounts,
  allAccountsActive,
  onToggleAllAccounts,
}) => {
  return (
    <div className="p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        统一管理
      </h3>
      <p className="text-gray-600 mb-6 text-sm">
        一键控制所有已连接社交媒体账号的发文状态。
      </p>
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-700 font-medium">
          {allConnectedAccounts.length > 0 
            ? `当前状态: ${allAccountsActive ? "所有平台正在发文" : "所有平台已暂停"}`
            : "没有已连接的平台"
          }
        </div>
        <Button
          variant={allAccountsActive ? "destructive" : "default"}
          onClick={onToggleAllAccounts}
          className="flex items-center space-x-2"
          disabled={allConnectedAccounts.length === 0}
        >
          {allAccountsActive ? (
            <><PauseCircle className="w-4 h-4" /><span>全部暂停</span></>
          ) : (
            <><PlayCircle className="w-4 h-4" /><span>全部启动</span></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UnifiedManagementSection;
