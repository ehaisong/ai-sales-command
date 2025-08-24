export interface ICPConfiguration {
  id: string;
  knowledge_base_id: string;
  name: string;
  customer_type: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICPB2BProfile {
  id: string;
  icp_configuration_id: string;
  industry?: string;
  sub_industry?: string;
  company_size_min?: number;
  company_size_max?: number;
  annual_revenue_min?: number;
  annual_revenue_max?: number;
  hq_location?: string;
  operating_regions?: string[];
  business_model?: string;
  technology_maturity?: string;
  growth_stage?: string;
  company_age?: number;
  ownership_type?: string;
  job_titles?: string[];
  seniority_levels?: string[];
  departments?: string[];
  buying_power?: string;
  pain_points?: string[];
  preferred_channels?: string[];
  tech_stack?: string[];
  online_presence?: string;
  recent_news?: string;
  competitor_overlap?: string[];
  hiring_trends?: boolean;
  adoption_intent_signals?: boolean;
  exclusion_criteria?: any;
  created_at: string;
  updated_at: string;
}

export interface ICPB2CProfile {
  id: string;
  icp_configuration_id: string;
  age_min?: number;
  age_max?: number;
  gender?: string[];
  income_min?: number;
  income_max?: number;
  location?: string[];
  occupation?: string[];
  education_level?: string[];
  tech_savviness?: string;
  device_preferences?: string[];
  preferred_communication?: string[];
  shopping_preferences?: string[];
  social_media_platforms?: string[];
  urban_rural_preference?: string;
  interests?: string[];
  values?: string[];
  lifestyle?: string[];
  personality_traits?: string[];
  motivations?: string[];
  pain_points?: string[];
  purchase_behavior?: string[];
  digital_engagement?: string;
  brand_loyalty?: string;
  exclusion_criteria?: any;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBase {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  status: string;
  business_overview?: any;
  icp_description?: any;
  value_proposition?: any;
  website_url?: string;
  linkedin_url?: string;
  uploaded_file_url?: string;
  analysis_status: string;
  analyzed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Prospect {
  id: string;
  knowledge_base_id: string;
  name: string;
  company: string;
  position?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  location?: string;
  industry?: string;
  company_size?: string;
  score?: number;
  match_reasons?: string[];
  notes?: string;
  source: string;
  is_priority: boolean;
  created_at: string;
  updated_at: string;
}