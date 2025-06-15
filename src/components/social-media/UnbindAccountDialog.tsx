
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlatformAccount } from '@/types/socialMedia';
import { buttonVariants } from "@/components/ui/button";

interface UnbindAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: PlatformAccount | null;
  onConfirm: () => void;
}

const UnbindAccountDialog: React.FC<UnbindAccountDialogProps> = ({
  open,
  onOpenChange,
  account,
  onConfirm,
}) => {
  if (!account) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认解绑账号？</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要解绑 <span className="font-semibold">{account.accountName}</span> 吗？解绑后，AI将无法管理此账号或发布内容，但历史发文记录将保留。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: "destructive" })}>
            确认解绑
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnbindAccountDialog;
