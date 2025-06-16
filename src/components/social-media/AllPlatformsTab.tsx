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
  onToggleAllAccounts
}) => {
  return <div className="space-y-6 mt-4">
      {allConnectedAccounts.length > 0}

      <UnifiedManagementSection allConnectedAccounts={allConnectedAccounts} allAccountsActive={allAccountsActive} onToggleAllAccounts={onToggleAllAccounts} />
    </div>;
};
export default AllPlatformsTab;