
export interface Email {
  id: string;
  user_id: number;
  brand_id: number;
  customer_id?: number;
  from_email: string;
  to_email: string;
  subject: string;
  content?: string;
  email_type: 'manual' | 'ai_generated' | 'template';
  priority: 'high' | 'medium' | 'low';
  status: 'draft' | 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced';
  is_read: boolean;
  thread_id?: string;
  reply_to_id?: string;
  scheduled_at?: Date;
  sent_at?: Date;
  opened_at?: Date;
  replied_at?: Date;
  attachments: string[];
  tracking_data: Record<string, any>;
  ai_insights: Record<string, any>;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface EmailTemplate {
  id: string;
  user_id: number;
  brand_id: number;
  name: string;
  category?: string;
  subject_template: string;
  html_content?: string;
  text_content?: string;
  variables: any[];
  is_ai_generated: boolean;
  usage_count: number;
  performance_score?: number;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface EmailFilter {
  category: 'all' | 'manual' | 'ai' | 'template';
  priority?: 'high' | 'medium' | 'low';
  status?: 'draft' | 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced';
  isRead?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface EmailStats {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
  bounced: number;
  pending: number;
}
