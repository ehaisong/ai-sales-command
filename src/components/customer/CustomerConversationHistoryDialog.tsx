
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MessageSquare, Calendar } from "lucide-react";
import { Customer } from "@/types/customer";

// 模拟历史记录数据
const mockConversations = [
  {
    id: "email1",
    type: "email",
    subject: "产品咨询",
    detail: "您好，我想了解一下贵公司的产品参数。",
    date: "2024-06-10 10:32",
    sender: "jane@example.com"
  },
  {
    id: "phone1",
    type: "call",
    subject: "电话沟通",
    detail: "客户电话联系，询问售后政策。",
    date: "2024-06-11 14:03",
    sender: "139****8888"
  },
  {
    id: "meeting1",
    type: "meeting",
    subject: "线上会议",
    detail: "与客户线上会议，讨论采购细节。",
    date: "2024-06-12 09:00",
    sender: "业务员A"
  },
];

interface CustomerConversationHistoryDialogProps {
  customer: Customer;
}

const typeIconMap = {
  email: <Mail className="h-4 w-4 text-primary" />,
  call: <MessageSquare className="h-4 w-4 text-primary" />,
  meeting: <Calendar className="h-4 w-4 text-primary" />,
};

const CustomerConversationHistoryDialog: React.FC<CustomerConversationHistoryDialogProps> = ({ customer }) => {
  // 实际项目可根据 customer 加载真实数据
  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>与 {customer.name} 的交流历史</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {mockConversations.map(rec => (
          <div key={rec.id} className="flex items-start gap-3 border-b last:border-b-0 py-2">
            <div>{typeIconMap[rec.type]}</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{rec.subject}</div>
              <div className="text-xs text-muted-foreground mb-0.5">{rec.date} · {rec.sender}</div>
              <div className="text-sm">{rec.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
};

export default CustomerConversationHistoryDialog;
