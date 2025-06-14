
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

type FileUploadDialogProps = {
  open: boolean;
  onClose: () => void;
};

const FileUploadDialog = ({ open, onClose }: FileUploadDialogProps) => {
  // TODO: Implement file upload logic
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>上传公司文件</DialogTitle>
          <DialogDescription>支持PDF、Word、图片等格式</DialogDescription>
        </DialogHeader>
        <div className="my-3">
          <input type="file" multiple />
        </div>
        <DialogClose asChild>
          <Button className="mt-2">关闭</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
