
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
import { Button } from "@/components/ui/button";
import { getTagStyle } from "@/config/tagConfig";

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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{knowledge.title}</DialogTitle>
          <DialogDescription>
            来源：{knowledge.source}，更新时间：{knowledge.updatedAt}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 text-base text-gray-700 leading-relaxed max-h-[40vh] overflow-y-auto">
          {knowledge.summary}
        </div>
        <div className="flex flex-wrap gap-2">
          {knowledge.tags.map((tag: string) => {
            const { icon: Icon, color, iconColor } = getTagStyle(tag);
            return (
              <Badge key={tag} variant="secondary" className={`text-xs font-medium ${color}`}>
                <Icon className={`w-3 h-3 mr-1.5 ${iconColor}`} />
                {tag}
              </Badge>
            );
          })}
        </div>
        <DialogClose asChild>
          <Button type="button" variant="outline" className="mt-6">关闭</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeDetailDialog;
