
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type KnowledgeDetailDialogProps = {
  open: boolean;
  knowledge: any;
  onClose: () => void;
};

const KnowledgeDetailDialog = ({
  open,
  knowledge,
  onClose,
}: KnowledgeDetailDialogProps) => {
  if (!knowledge) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{knowledge.title}</DialogTitle>
          <DialogDescription>
            来源：{knowledge.source}，更新时间：{knowledge.updatedAt}
          </DialogDescription>
        </DialogHeader>
        <div className="my-3">{knowledge.summary}</div>
        <div className="flex gap-2">
          {knowledge.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <DialogClose asChild>
          <button className="mt-4 btn btn-primary">关闭</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeDetailDialog;
