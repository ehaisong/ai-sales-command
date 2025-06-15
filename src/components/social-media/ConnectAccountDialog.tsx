
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlatformAccount, SocialPlatform } from '@/types/socialMedia';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConnectAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: SocialPlatform | null;
  accounts: PlatformAccount[];
  onConnect: (accountId: string) => void;
}

const ConnectAccountDialog: React.FC<ConnectAccountDialogProps> = ({
  open,
  onOpenChange,
  platform,
  accounts,
  onConnect,
}) => {
  const navigate = useNavigate();

  if (!platform) return null;

  const platformName = platform === 'twitter' ? 'X (Twitter)' : platform.charAt(0).toUpperCase() + platform.slice(1);

  const handleBindNew = () => {
    onOpenChange(false);
    navigate('/ai-agent/settings');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>连接 {platformName} 账号</DialogTitle>
          <DialogDescription>
            选择一个已绑定的账号进行连接，或绑定一个新账号。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4 max-h-[40vh] overflow-y-auto">
          {accounts.length > 0 ? (
            accounts.map(account => (
              <div key={account.accountId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{account.accountName}</p>
                  <p className="text-sm text-gray-500">{account.followerCount} 粉丝 · {account.totalPosts} 条发文</p>
                </div>
                <Button size="sm" onClick={() => onConnect(account.accountId)}>连接</Button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>没有可连接的已绑定账号。</p>
            </div>
          )}
        </div>
        <DialogFooter>
           <Button variant="outline" className="w-full" onClick={handleBindNew}>
            <Plus className="w-4 h-4 mr-2" />
            前往设置页面绑定新账号
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
