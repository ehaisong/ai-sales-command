
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
import { Customer } from '@/types/customer';

interface SwitchConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customer: Customer | null;
  isActivating: boolean;
}

const SwitchConfirmDialog: React.FC<SwitchConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  customer,
  isActivating,
}) => {
  const title = isActivating ? '激活客户' : '停用客户';
  const description = isActivating 
    ? `您确定要激活客户 "${customer?.name}" 吗？激活后客户将可以正常操作。`
    : `您确定要停用客户 "${customer?.name}" 吗？停用后客户信息将变为只读状态。`;
  
  const confirmText = isActivating ? '激活' : '停用';
  const confirmButtonClass = isActivating 
    ? 'bg-green-600 hover:bg-green-700' 
    : 'bg-orange-600 hover:bg-orange-700';

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={confirmButtonClass}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SwitchConfirmDialog;
