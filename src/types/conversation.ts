
export interface UnifiedMessage {
  id: string;
  conversationId: string;
  type: 'email' | 'whatsapp';
  direction: 'inbound' | 'outbound';
  content: string;
  subject?: string; // Only for emails
  timestamp: Date;
  isRead: boolean;
  isAIGenerated: boolean;
  sender: {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
  recipient: {
    name: string;
    email?: string;
    phone?: string;
  };
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: string[];
  metadata?: {
    emailId?: string;
    whatsappMessageId?: string;
    priority?: 'high' | 'medium' | 'low';
  };
}

export interface UnifiedConversation {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  customerEmail?: string;
  customerPhone?: string;
  lastMessage: UnifiedMessage;
  unreadCount: number;
  totalMessages: number;
  channels: ('email' | 'whatsapp')[];
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'closed' | 'pending';
  isAIManaged: boolean;
  manualTakeoverAt?: Date;
  manualTakeoverBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationFilter {
  channel?: 'all' | 'email' | 'whatsapp';
  status?: 'all' | 'active' | 'closed' | 'pending';
  priority?: 'all' | 'high' | 'medium' | 'low';
  isRead?: boolean;
  aiManaged?: 'all' | 'ai' | 'manual';
}

export interface CustomerConversationSummary {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  lastContactDate: Date;
  unreadCount: number;
  totalConversations: number;
  isAIManaged: boolean;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  channels: ('email' | 'whatsapp')[];
  status: 'active' | 'inactive';
}
