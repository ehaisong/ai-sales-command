
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
import { SocialPost } from '@/types/socialMedia';
import { buttonVariants } from "@/components/ui/button";

interface DeletePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: SocialPost | null;
  onConfirm: () => void;
}

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
  open,
  onOpenChange,
  post,
  onConfirm,
}) => {
  if (!post) return null;

  const postPreview = post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除帖子？</AlertDialogTitle>
          <AlertDialogDescription>
            您确定要删除这篇帖子吗？
            <span className="block bg-gray-100 p-2 my-2 rounded text-gray-700 font-normal">"{postPreview}"</span>
            此操作不可撤销，帖子将被永久删除。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={buttonVariants({ variant: "destructive" })}>
            确认删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
