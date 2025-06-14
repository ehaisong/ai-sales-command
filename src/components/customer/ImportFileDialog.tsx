
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ImportFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  importType: "csv" | "excel";
}

const getImportName = (type: "csv" | "excel") =>
  type === "csv" ? "CSV 文件" : "Excel 文件";

const ImportFileDialog: React.FC<ImportFileDialogProps> = ({ open, onOpenChange, importType }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    // 真实应用中实现上传逻辑
    console.log(`上传 ${importType} 文件:`, file);
    // 关闭弹窗并清空文件
    setFile(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            导入{getImportName(importType)}
          </DialogTitle>
          <DialogDescription>
            请选择要导入的{getImportName(importType)}，上传后将自动导入客户数据。
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <Input
            type="file"
            accept={importType === "csv" ? ".csv" : ".xls,.xlsx"}
            onChange={handleFileChange}
          />
          {file && (
            <div className="text-sm text-primary truncate flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {file.name}
            </div>
          )}
        </div>
        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={handleCancel}>
              取消
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!file}
            onClick={handleUpload}
          >
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFileDialog;
