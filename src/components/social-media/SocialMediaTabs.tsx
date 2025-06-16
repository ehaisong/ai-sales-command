
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPlatformAccounts } from "./mockSocialData";
import { SocialPlatform, PlatformAccount } from "@/types/socialMedia";
import { useToast } from "@/hooks/use-toast";
import ConnectAccountDialog from "./ConnectAccountDialog";
import UnbindAccountDialog from "./UnbindAccountDialog";
import AllPlatformsTab from "./AllPlatformsTab";
import PlatformTab from "./PlatformTab";

interface SocialMediaTabsProps {
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

const SocialMediaTabs: React.FC<SocialMediaTabsProps> = ({
  selectedPlatform,
  onPlatformChange,
}) => {
  const [accounts, setAccounts] = useState<PlatformAccount[]>(mockPlatformAccounts);
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [platformToConnect, setPlatformToConnect] = useState<SocialPlatform | null>(null);

  const [unbindDialogOpen, setUnbindDialogOpen] = useState(false);
  const [accountToUnbind, setAccountToUnbind] = useState<PlatformAccount | null>(null);

  const allConnectedAccounts = accounts.filter(a => a.isConnected);
  const allAccountsActive = allConnectedAccounts.length > 0 && allConnectedAccounts.every(a => a.isActive);

  const handleToggleAccount = (accountId: string) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(acc =>
        acc.accountId === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    );
  };

  const handleToggleAllAccounts = () => {
    const newState = !allAccountsActive;
    setAccounts(prevAccounts =>
      prevAccounts.map(acc =>
        acc.isConnected ? { ...acc, isActive: newState } : acc
      )
    );
    toast({
      title: `所有账号已${newState ? '启动' : '暂停'}`,
      description: `所有已连接的账号已${newState ? '开始' : '暂停'}发文。`,
    });
  };

  const handleOpenConnectDialog = (platform: SocialPlatform) => {
    setPlatformToConnect(platform);
    setDialogOpen(true);
  };

  const handleConnectAccount = (accountId: string) => {
    const accountToConnect = accounts.find(a => a.accountId === accountId);
    if (!accountToConnect) return;
    
    setAccounts(prevAccounts => 
      prevAccounts.map(acc => {
        if (acc.platform === accountToConnect.platform) {
          return { ...acc, isConnected: acc.accountId === accountId, isActive: acc.accountId === accountId };
        }
        return acc;
      })
    );
    
    setDialogOpen(false);
    toast({
      title: "账号已连接",
      description: `${accountToConnect.accountName} 已成功连接。`,
    });
  };

  const handleOpenUnbindDialog = (account: PlatformAccount) => {
    setAccountToUnbind(account);
    setUnbindDialogOpen(true);
  };

  const handleUnbindConfirm = () => {
    if (!accountToUnbind) return;

    setAccounts(prevAccounts =>
      prevAccounts.map(acc =>
        acc.accountId === accountToUnbind.accountId
          ? { ...acc, isConnected: false, isActive: false }
          : acc
      )
    );

    toast({
      title: "账号已解绑",
      description: `${accountToUnbind.accountName} 已成功解绑。`,
    });
    
    setUnbindDialogOpen(false);
    setAccountToUnbind(null);
  };

  return (
    <>
      <Tabs value={selectedPlatform} onValueChange={onPlatformChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">X (Twitter)</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllPlatformsTab
            allConnectedAccounts={allConnectedAccounts}
            allAccountsActive={allAccountsActive}
            onPlatformChange={onPlatformChange}
            onToggleAllAccounts={handleToggleAllAccounts}
          />
        </TabsContent>

        {['linkedin', 'instagram', 'twitter'].map((platform) => (
          <TabsContent key={platform} value={platform} className="mt-4">
            <PlatformTab
              platform={platform}
              account={accounts.find(a => a.platform === platform && a.isConnected)}
              onToggleAccount={handleToggleAccount}
              onOpenConnectDialog={handleOpenConnectDialog}
              onOpenUnbindDialog={handleOpenUnbindDialog}
            />
          </TabsContent>
        ))}
      </Tabs>
      <ConnectAccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        platform={platformToConnect}
        accounts={accounts.filter(a => a.platform === platformToConnect && !a.isConnected)}
        onConnect={handleConnectAccount}
      />
      <UnbindAccountDialog
        open={unbindDialogOpen}
        onOpenChange={setUnbindDialogOpen}
        account={accountToUnbind}
        onConfirm={handleUnbindConfirm}
      />
    </>
  );
};

export default SocialMediaTabs;
