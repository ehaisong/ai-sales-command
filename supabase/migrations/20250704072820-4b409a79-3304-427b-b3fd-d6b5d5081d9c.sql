
-- 扩展邮件表结构，添加更多营销相关字段
CREATE TABLE IF NOT EXISTS public.emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  brand_id integer NOT NULL,
  customer_id integer,
  from_email varchar(255) NOT NULL,
  to_email varchar(255) NOT NULL,
  subject text NOT NULL,
  content text,
  email_type varchar(50) DEFAULT 'manual', -- manual, ai_generated, template
  priority varchar(20) DEFAULT 'medium', -- high, medium, low
  status varchar(50) DEFAULT 'draft', -- draft, sent, delivered, opened, replied, bounced
  is_read boolean DEFAULT false,
  thread_id uuid, -- 用于邮件会话线程
  reply_to_id uuid REFERENCES public.emails(id),
  scheduled_at timestamp,
  sent_at timestamp,
  opened_at timestamp,
  replied_at timestamp,
  attachments jsonb DEFAULT '[]',
  tracking_data jsonb DEFAULT '{}',
  ai_insights jsonb DEFAULT '{}',
  tags text[],
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 扩展客户表，添加更多客户360°视图相关字段
ALTER TABLE public.customers 
ADD COLUMN IF NOT EXISTS email varchar(255),
ADD COLUMN IF NOT EXISTS company_size varchar(50),
ADD COLUMN IF NOT EXISTS industry varchar(100),
ADD COLUMN IF NOT EXISTS country varchar(100),
ADD COLUMN IF NOT EXISTS website varchar(500),
ADD COLUMN IF NOT EXISTS annual_revenue bigint,
ADD COLUMN IF NOT EXISTS employee_count integer,
ADD COLUMN IF NOT EXISTS lead_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS lifecycle_stage varchar(50) DEFAULT 'lead',
ADD COLUMN IF NOT EXISTS last_activity_at timestamp,
ADD COLUMN IF NOT EXISTS acquisition_cost decimal(10,2),
ADD COLUMN IF NOT EXISTS lifetime_value decimal(10,2),
ADD COLUMN IF NOT EXISTS preferred_language varchar(10) DEFAULT 'zh-CN',
ADD COLUMN IF NOT EXISTS time_zone varchar(50),
ADD COLUMN IF NOT EXISTS social_profiles jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS custom_fields jsonb DEFAULT '{}';

-- 创建客户交互记录表
CREATE TABLE IF NOT EXISTS public.customer_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id integer NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  user_id integer NOT NULL,
  brand_id integer NOT NULL,
  interaction_type varchar(50) NOT NULL, -- email, call, meeting, social, website_visit
  channel varchar(50), -- email, phone, whatsapp, wechat, linkedin, etc.
  subject text,
  content text,
  direction varchar(20) DEFAULT 'outbound', -- inbound, outbound
  status varchar(50) DEFAULT 'completed',
  duration_minutes integer,
  outcome varchar(100),
  next_follow_up_date timestamp,
  metadata jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 创建营销活动表
CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  brand_id integer NOT NULL,
  name varchar(255) NOT NULL,
  campaign_type varchar(50) NOT NULL, -- email_sequence, drip_campaign, newsletter
  status varchar(50) DEFAULT 'draft', -- draft, active, paused, completed, archived
  target_audience jsonb DEFAULT '{}',
  email_template_id uuid,
  schedule_config jsonb DEFAULT '{}',
  performance_metrics jsonb DEFAULT '{}',
  a_b_test_config jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 创建邮件模板表
CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  brand_id integer NOT NULL,
  name varchar(255) NOT NULL,
  category varchar(100),
  subject_template text NOT NULL,
  html_content text,
  text_content text,
  variables jsonb DEFAULT '[]', -- 模板变量定义
  is_ai_generated boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  performance_score decimal(3,2),
  tags text[],
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 创建AI对话历史表
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id integer NOT NULL,
  brand_id integer NOT NULL,
  customer_id integer,
  conversation_type varchar(50) DEFAULT 'general', -- email_assistant, customer_insight, content_generation
  title varchar(255),
  messages jsonb NOT NULL DEFAULT '[]',
  context_data jsonb DEFAULT '{}',
  ai_model varchar(50) DEFAULT 'gpt-4',
  total_tokens integer DEFAULT 0,
  status varchar(50) DEFAULT 'active',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- 创建客户标签关联表
CREATE TABLE IF NOT EXISTS public.customer_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id integer NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  tag_id integer NOT NULL REFERENCES public.system_tags(id) ON DELETE CASCADE,
  assigned_by integer NOT NULL,
  assigned_at timestamp DEFAULT now(),
  UNIQUE(customer_id, tag_id)
);

-- 创建邮件追踪事件表
CREATE TABLE IF NOT EXISTS public.email_tracking_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id uuid NOT NULL REFERENCES public.emails(id) ON DELETE CASCADE,
  event_type varchar(50) NOT NULL, -- sent, delivered, opened, clicked, bounced, replied
  event_data jsonb DEFAULT '{}',
  ip_address varchar(45),
  user_agent text,
  location_data jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now()
);

-- 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_emails_user_brand ON public.emails(user_id, brand_id);
CREATE INDEX IF NOT EXISTS idx_emails_customer ON public.emails(customer_id);
CREATE INDEX IF NOT EXISTS idx_emails_thread ON public.emails(thread_id);
CREATE INDEX IF NOT EXISTS idx_emails_status ON public.emails(status);
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON public.emails(created_at);

CREATE INDEX IF NOT EXISTS idx_customer_interactions_customer ON public.customer_interactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_type ON public.customer_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_created_at ON public.customer_interactions(created_at);

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_industry ON public.customers(industry);
CREATE INDEX IF NOT EXISTS idx_customers_lead_score ON public.customers(lead_score);
CREATE INDEX IF NOT EXISTS idx_customers_lifecycle_stage ON public.customers(lifecycle_stage);

CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_brand ON public.marketing_campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_marketing_campaigns_status ON public.marketing_campaigns(status);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_brand ON public.ai_conversations(user_id, brand_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_customer ON public.ai_conversations(customer_id);

-- 启用行级安全策略
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_tracking_events ENABLE ROW LEVEL SECURITY;

-- 创建基本的RLS策略（用户只能访问自己的数据）
CREATE POLICY "Users can manage their own emails" ON public.emails
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text));

CREATE POLICY "Users can manage their own customer interactions" ON public.customer_interactions
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text));

CREATE POLICY "Users can manage their own marketing campaigns" ON public.marketing_campaigns
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text));

CREATE POLICY "Users can manage their own email templates" ON public.email_templates
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text));

CREATE POLICY "Users can manage their own AI conversations" ON public.ai_conversations
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text));

CREATE POLICY "Users can manage customer tags for their customers" ON public.customer_tags
  FOR ALL USING (customer_id IN (
    SELECT id FROM public.customers 
    WHERE user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text)
  ));

CREATE POLICY "Users can view email tracking for their emails" ON public.email_tracking_events
  FOR ALL USING (email_id IN (
    SELECT id FROM public.emails 
    WHERE user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()::text)
  ));
