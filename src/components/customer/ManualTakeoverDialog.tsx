
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
} from '@/components/ui/alert-dialog';
import { CustomerConversationSummary } from '@/types/conversation';

interface ManualTakeoverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerConversationSummary;
  onConfirm: () => void;
}

const ManualTakeoverDialog: React.FC<ManualTakeoverDialogProps> = ({
  open,
  onOpenChange,
  customer,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="animate-scale-in">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-orange-600">
            手动接管客户
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            您确定要手动接管客户 <span className="font-medium text-foreground">{customer.name}</span> 的对话吗？
            <br />
            <br />
            接管后，AI助手将暂停自动回复，所有对话将由您手动处理。您可以随时重新启用AI自动模式。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-all duration-200 hover:scale-105">
            取消
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-orange-600 hover:bg-orange-700 transition-all duration-200 hover:scale-105"
          >
            确认接管
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ManualTakeoverDialog;
