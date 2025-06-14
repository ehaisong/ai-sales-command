
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type SourceConfigDialogProps = {
  open: boolean;
  onClose: () => void;
};

const SourceConfigDialog = ({ open, onClose }: SourceConfigDialogProps) => {
  // TODO: Add website/news collection config form
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>采集配置</DialogTitle>
          <DialogDescription>
            配置官网自动采集和新闻监控信息
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 text-sm text-muted-foreground">
          此处可编辑公司官网自动采集和新闻监控相关配置（功能待完善）
        </div>
        <DialogClose asChild>
          <Button className="mt-2">关闭</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SourceConfigDialog;
