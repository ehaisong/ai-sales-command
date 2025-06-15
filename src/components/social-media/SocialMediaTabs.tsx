import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Linkedin, Instagram, Twitter, Plus, Pause, Play, PlayCircle, PauseCircle } from "lucide-react";
import { mockPlatformAccounts } from "./mockSocialData";
import { SocialPlatform } from "@/types/socialMedia";

const platformIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
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
  const [allAccountsActive, setAllAccountsActive] = useState(true);

  const handleToggleAccount = (platform: SocialPlatform) => {
    console.log(`Toggle account for ${platform}`);
  };

  const handleToggleAllAccounts = () => {
    setAllAccountsActive(!allAccountsActive);
    console.log(`Toggle all accounts: ${!allAccountsActive ? 'start' : 'pause'}`);
  };

  return (
    <Tabs value={selectedPlatform} onValueChange={onPlatformChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">全部</TabsTrigger>
        <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
        <TabsTrigger value="instagram">Instagram</TabsTrigger>
        <TabsTrigger value="twitter">Twitter</TabsTrigger>
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
          >
            {allAccountsActive ? (
              <>
                <PauseCircle className="w-5 h-5" />
                <span>全部暂停</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                <span>全部启动</span>
              </>
            )}
          </Button>

          <div className="text-sm text-gray-500 mt-4">
            当前状态: {allAccountsActive ? "所有平台正在发文" : "所有平台已暂停发文"}
          </div>
        </div>
      </TabsContent>

      {['linkedin', 'instagram', 'twitter'].map((platform) => (
        <TabsContent key={platform} value={platform} className="mt-4">
          {(() => {
            const account = mockPlatformAccounts.find(a => a.platform === platform);
            const Icon = platformIcons[platform as SocialPlatform];
            const color = platformColors[platform as keyof typeof platformColors];
            
            if (!account?.isConnected) {
              return (
                <div className="text-center py-8">
                  <Icon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {platform === 'linkedin' ? 'LinkedIn' : 
                     platform === 'instagram' ? 'Instagram' : 'Twitter'} 账号未连接
                  </h3>
                  <p className="text-gray-500 mb-4">连接您的账号开始管理发文内容</p>
                  <Button>
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
                        <Badge variant="default" className="text-xs">已连接</Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {account.followerCount} 粉丝 · {account.totalPosts} 条发文
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">发文</span>
                      <Switch
                        checked={account.isActive}
                        onCheckedChange={() => handleToggleAccount(account.platform)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAccount(account.platform)}
                    >
                      {account.isActive ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          暂停
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          恢复
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SocialMediaTabs;
