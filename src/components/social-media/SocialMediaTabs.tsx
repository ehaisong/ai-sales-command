
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Linkedin, Instagram, Twitter, Plus, PauseCircle, PlayCircle } from "lucide-react";
import { mockPlatformAccounts } from "./mockSocialData";
import { SocialPlatform, PlatformAccount } from "@/types/socialMedia";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ConnectAccountDialog from "./ConnectAccountDialog";

const platformIcons: Record<SocialPlatform, React.ElementType> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  all: () => null,
};

const platformColors = {
  linkedin: "text-[#0A66C2]",
  instagram: "text-[#E4405F]",
  twitter: "text-black",
};

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
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [platformToConnect, setPlatformToConnect] = useState<SocialPlatform | null>(null);

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

  return (
    <>
      <Tabs value={selectedPlatform} onValueChange={onPlatformChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">X (Twitter)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                统一管理所有平台
              </h3>
              <p className="text-gray-600 mb-6">
                一键控制所有已连接社交媒体账号的发文状态
              </p>
            </div>
            <Button
              size="lg"
              variant={allAccountsActive ? "destructive" : "default"}
              onClick={handleToggleAllAccounts}
              className="flex items-center space-x-2 px-8 py-3 text-base"
              disabled={allConnectedAccounts.length === 0}
            >
              {allAccountsActive ? (
                <><PauseCircle className="w-5 h-5" /><span>全部暂停</span></>
              ) : (
                <><PlayCircle className="w-5 h-5" /><span>全部启动</span></>
              )}
            </Button>
            <div className="text-sm text-gray-500 mt-4">
              {allConnectedAccounts.length > 0 
                ? `当前状态: ${allAccountsActive ? "所有平台正在发文" : "所有平台已暂停发文"}`
                : "没有已连接的平台"
              }
            </div>
          </div>
        </TabsContent>

        {['linkedin', 'instagram', 'twitter'].map((platform) => (
          <TabsContent key={platform} value={platform} className="mt-4">
            {(() => {
              const account = accounts.find(a => a.platform === platform && a.isConnected);
              const Icon = platformIcons[platform as SocialPlatform];
              const color = platformColors[platform as keyof typeof platformColors];
              
              if (!account) {
                return (
                  <div className="text-center py-8">
                    <Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {platform === 'linkedin' ? 'LinkedIn' : 
                       platform === 'instagram' ? 'Instagram' : 'X (Twitter)'} 账号未连接
                    </h3>
                    <p className="text-gray-500 mb-4">连接您的账号开始管理发文内容</p>
                    <Button onClick={() => handleOpenConnectDialog(platform as SocialPlatform)}>
                      <Plus className="w-4 h-4 mr-2" />
                      连接账号
                    </Button>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{account.accountName}</span>
                          <Badge variant="default" className="text-xs bg-green-100 text-green-800">已连接</Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {account.followerCount} 粉丝 · {account.totalPosts} 条发文
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-medium ${account.isActive ? 'text-primary' : 'text-gray-500'}`}>
                        {account.isActive ? '自动发文' : '已暂停'}
                      </span>
                      <Switch
                        checked={account.isActive}
                        onCheckedChange={() => handleToggleAccount(account.accountId)}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
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
    </>
  );
};

export default SocialMediaTabs;
