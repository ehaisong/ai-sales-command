
import React from 'react';
import { PlatformAccount } from '@/types/socialMedia';
import ConnectedAccountCard from './ConnectedAccountCard';
import UnifiedManagementSection from './UnifiedManagementSection';

interface AllPlatformsTabProps {
  allConnectedAccounts: PlatformAccount[];
  allAccountsActive: boolean;
  onPlatformChange: (platform: string) => void;
  onToggleAllAccounts: () => void;
}

const AllPlatformsTab: React.FC<AllPlatformsTabProps> = ({
  allConnectedAccounts,
  allAccountsActive,
  onPlatformChange,
  onToggleAllAccounts,
}) => {
  return (
    <div className="space-y-6 mt-4">
      {allConnectedAccounts.length > 0 && (
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">已连接账号</h3>
          <div className="flex flex-wrap gap-4">
            {allConnectedAccounts.map((account) => (
              <ConnectedAccountCard
                key={account.accountId}
                account={account}
                onPlatformChange={onPlatformChange}
              />
            ))}
          </div>
        </div>
      )}

      <UnifiedManagementSection
        allConnectedAccounts={allConnectedAccounts}
        allAccountsActive={allAccountsActive}
        onToggleAllAccounts={onToggleAllAccounts}
      />
    </div>
  );
};

export default AllPlatformsTab;
