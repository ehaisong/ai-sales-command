
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";

interface CustomerKnowledgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  knowledgeList: string[];
  onAddKnowledge: (item: string) => void;
  customerName?: string;
}

const CustomerKnowledgeDialog: React.FC<CustomerKnowledgeDialogProps> = ({
  open,
  onOpenChange,
  knowledgeList,
  onAddKnowledge,
  customerName
}) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed.length > 0) {
      onAddKnowledge(trimmed);
      setInput("");
    }
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>知识库 - {customerName || "客户"}</DialogTitle>
        <DialogDescription>
          所有针对该客户的知识条目，可手动补充、优化。
        </DialogDescription>
      </DialogHeader>
      {/* 知识库列表 */}
      <ScrollArea className="h-48 mb-4 border rounded px-2 py-2 bg-muted/70">
        {knowledgeList.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            暂无知识条目，试试添加一条吧！
          </div>
        ) : (
          <ul className="space-y-2">
            {knowledgeList.map((item, idx) => (
              <li key={idx} className="bg-white rounded p-2 shadow text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      {/* 添加知识表单 */}
      <div className="flex gap-2">
        <Input
          placeholder="添加新知识条目…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleAdd();
          }}
          className="flex-1"
        />
        <Button variant="outline" onClick={handleAdd} type="button">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
  );
};

export default CustomerKnowledgeDialog;
