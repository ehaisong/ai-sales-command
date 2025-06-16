
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Linkedin, Instagram, Twitter, Plus, Unlink } from "lucide-react";
import { SocialPlatform, PlatformAccount } from "@/types/socialMedia";

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

interface PlatformTabProps {
  platform: string;
  account: PlatformAccount | undefined;
  onToggleAccount: (accountId: string) => void;
  onOpenConnectDialog: (platform: SocialPlatform) => void;
  onOpenUnbindDialog: (account: PlatformAccount) => void;
}

const PlatformTab: React.FC<PlatformTabProps> = ({
  platform,
  account,
  onToggleAccount,
  onOpenConnectDialog,
  onOpenUnbindDialog,
}) => {
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
        <Button onClick={() => onOpenConnectDialog(platform as SocialPlatform)}>
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
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${account.isActive ? 'text-primary' : 'text-gray-500'}`}>
            {account.isActive ? '自动发文' : '已暂停'}
          </span>
          <Switch
            checked={account.isActive}
            onCheckedChange={() => onToggleAccount(account.accountId)}
          />
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50" onClick={() => onOpenUnbindDialog(account)}>
            <Unlink className="w-4 h-4 mr-2" />
            解绑
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformTab;
