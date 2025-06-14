
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Platform = {
  key: string;
  name: string;
};

interface BindAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: Platform | null;
  onSave: (platform: Platform, account: string) => void;
}

const BindAccountDialog: React.FC<BindAccountDialogProps> = ({
  open,
  onOpenChange,
  platform,
  onSave,
}) => {
  const [account, setAccount] = useState("");

  React.useEffect(() => {
    // 清空输入框
    if (open) setAccount("");
  }, [open, platform?.key]);

  if (!platform) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>绑定{platform.name}账号</DialogTitle>
          <DialogDescription>
            填写账号信息以绑定{platform.name}平台账号
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="bind-account-input">
              账号
            </label>
            <Input
              id="bind-account-input"
              placeholder={`请输入${platform.name}账号`}
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              autoFocus
              required
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              取消
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => {
              if (!account) return;
              onSave(platform, account);
            }}
          >
            绑定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BindAccountDialog;

