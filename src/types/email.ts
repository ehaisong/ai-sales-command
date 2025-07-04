
export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isAIGenerated: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'inbox' | 'sent' | 'ai-sent' | 'draft';
  attachments?: string[];
}

export interface EmailFilter {
  category: 'all' | 'manual' | 'ai';
  priority?: 'high' | 'medium' | 'low';
  isRead?: boolean;
}
