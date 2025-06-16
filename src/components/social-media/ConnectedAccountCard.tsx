
import React from 'react';
import { PlatformAccount, SocialPlatform } from '@/types/socialMedia';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

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

interface ConnectedAccountCardProps {
  account: PlatformAccount;
  onPlatformChange: (platform: string) => void;
}

const ConnectedAccountCard: React.FC<ConnectedAccountCardProps> = ({
  account,
  onPlatformChange,
}) => {
  const Icon = platformIcons[account.platform];
  const color = platformColors[account.platform as keyof typeof platformColors];

  return (
    <div 
      className="flex-1 min-w-[300px] flex items-center justify-between p-3 border rounded-lg transition-shadow hover:shadow-md cursor-pointer" 
      onClick={() => onPlatformChange(account.platform)}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <span className="font-medium text-sm">{account.accountName}</span>
          <div className="text-xs text-gray-500">
            {account.followerCount.toLocaleString()} 粉丝
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${account.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
        <span className={`text-xs font-medium ${account.isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {account.isActive ? '发文中' : '已暂停'}
        </span>
      </div>
    </div>
  );
};

export default ConnectedAccountCard;
