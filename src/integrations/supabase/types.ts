export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliates: {
        Row: {
          created_at: string | null
          id: number
          invited_by: string
          paid_amount: number
          paid_order_no: string
          reward_amount: number
          reward_percent: number
          status: string
          user_uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          invited_by: string
          paid_amount?: number
          paid_order_no?: string
          reward_amount?: number
          reward_percent?: number
          status?: string
          user_uuid: string
        }
        Update: {
          created_at?: string | null
          id?: number
          invited_by?: string
          paid_amount?: number
          paid_order_no?: string
          reward_amount?: number
          reward_percent?: number
          status?: string
          user_uuid?: string
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          ai_model: string | null
          brand_id: number
          context_data: Json | null
          conversation_type: string | null
          created_at: string | null
          customer_id: number | null
          id: string
          messages: Json
          status: string | null
          title: string | null
          total_tokens: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          ai_model?: string | null
          brand_id: number
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: string
          messages?: Json
          status?: string | null
          title?: string | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          ai_model?: string | null
          brand_id?: number
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          customer_id?: number | null
          id?: string
          messages?: Json
          status?: string | null
          title?: string | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      apikeys: {
        Row: {
          api_key: string
          created_at: string | null
          id: number
          status: string | null
          title: string | null
          user_uuid: string
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: number
          status?: string | null
          title?: string | null
          user_uuid: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: number
          status?: string | null
          title?: string | null
          user_uuid?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          slug: string
          sort_order: number
          status: string
          updated_at: string | null
          uuid: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          slug: string
          sort_order?: number
          status?: string
          updated_at?: string | null
          uuid: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          slug?: string
          sort_order?: number
          status?: string
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
      brand_statistics: {
        Row: {
          brand_id: number
          created_at: string | null
          id: number
          pending_messages: number | null
          today_customers: number | null
          today_received_messages: number | null
          today_sent_messages: number | null
          updated_at: string | null
        }
        Insert: {
          brand_id: number
          created_at?: string | null
          id?: number
          pending_messages?: number | null
          today_customers?: number | null
          today_received_messages?: number | null
          today_sent_messages?: number | null
          updated_at?: string | null
        }
        Update: {
          brand_id?: number
          created_at?: string | null
          id?: number
          pending_messages?: number | null
          today_customers?: number | null
          today_received_messages?: number | null
          today_sent_messages?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          brand_name: string
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: number
        }
        Insert: {
          brand_name: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id: number
        }
        Update: {
          brand_name?: string
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      credits: {
        Row: {
          created_at: string | null
          credits: number
          expired_at: string | null
          id: number
          order_no: string | null
          trans_no: string
          trans_type: string
          user_uuid: string
        }
        Insert: {
          created_at?: string | null
          credits: number
          expired_at?: string | null
          id?: number
          order_no?: string | null
          trans_no: string
          trans_type: string
          user_uuid: string
        }
        Update: {
          created_at?: string | null
          credits?: number
          expired_at?: string | null
          id?: number
          order_no?: string | null
          trans_no?: string
          trans_type?: string
          user_uuid?: string
        }
        Relationships: []
      }
      customer_interactions: {
        Row: {
          brand_id: number
          channel: string | null
          content: string | null
          created_at: string | null
          customer_id: number
          direction: string | null
          duration_minutes: number | null
          id: string
          interaction_type: string
          metadata: Json | null
          next_follow_up_date: string | null
          outcome: string | null
          status: string | null
          subject: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          brand_id: number
          channel?: string | null
          content?: string | null
          created_at?: string | null
          customer_id: number
          direction?: string | null
          duration_minutes?: number | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          next_follow_up_date?: string | null
          outcome?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          brand_id?: number
          channel?: string | null
          content?: string | null
          created_at?: string | null
          customer_id?: number
          direction?: string | null
          duration_minutes?: number | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          next_follow_up_date?: string | null
          outcome?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "customer_interactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_seo_keywords: {
        Row: {
          brand_id: number
          created_at: string | null
          id: number
          keyword: string
          updated_at: string | null
          user_id: number
        }
        Insert: {
          brand_id: number
          created_at?: string | null
          id?: number
          keyword: string
          updated_at?: string | null
          user_id: number
        }
        Update: {
          brand_id?: number
          created_at?: string | null
          id?: number
          keyword?: string
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      customer_seo_landing_pages: {
        Row: {
          avg_time_on_page: number | null
          bounce_rate: number | null
          brand_id: number
          created_at: string | null
          daily_visits: number | null
          id: number
          keywords: Json
          loading_speed: string | null
          mobile_friendly: boolean | null
          monthly_visits: number | null
          seo_score: number | null
          status: string | null
          thumbnail: string | null
          title: string
          updated_at: string | null
          url: string
          user_id: number
          weekly_visits: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          brand_id: number
          created_at?: string | null
          daily_visits?: number | null
          id?: number
          keywords: Json
          loading_speed?: string | null
          mobile_friendly?: boolean | null
          monthly_visits?: number | null
          seo_score?: number | null
          status?: string | null
          thumbnail?: string | null
          title: string
          updated_at?: string | null
          url: string
          user_id: number
          weekly_visits?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          brand_id?: number
          created_at?: string | null
          daily_visits?: number | null
          id?: number
          keywords?: Json
          loading_speed?: string | null
          mobile_friendly?: boolean | null
          monthly_visits?: number | null
          seo_score?: number | null
          status?: string | null
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
          url?: string
          user_id?: number
          weekly_visits?: number | null
        }
        Relationships: []
      }
      customer_tags: {
        Row: {
          assigned_at: string | null
          assigned_by: number
          customer_id: number
          id: string
          tag_id: number
        }
        Insert: {
          assigned_at?: string | null
          assigned_by: number
          customer_id: number
          id?: string
          tag_id: number
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: number
          customer_id?: number
          id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "customer_tags_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "system_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          acquisition_cost: number | null
          annual_revenue: number | null
          brand_id: number
          company_size: string | null
          contact_method: string | null
          contact_person: string | null
          country: string | null
          created_at: string | null
          custom_fields: Json | null
          customer_name: string
          customer_source: string | null
          customer_tags: string | null
          customer_type: string | null
          email: string | null
          employee_count: number | null
          id: number
          industry: string | null
          last_activity_at: string | null
          lead_score: number | null
          lifecycle_stage: string | null
          lifetime_value: number | null
          phone_number: string | null
          preferred_language: string | null
          social_profiles: Json | null
          time_zone: string | null
          updated_at: string | null
          user_id: number
          website: string | null
        }
        Insert: {
          acquisition_cost?: number | null
          annual_revenue?: number | null
          brand_id: number
          company_size?: string | null
          contact_method?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          customer_name: string
          customer_source?: string | null
          customer_tags?: string | null
          customer_type?: string | null
          email?: string | null
          employee_count?: number | null
          id?: number
          industry?: string | null
          last_activity_at?: string | null
          lead_score?: number | null
          lifecycle_stage?: string | null
          lifetime_value?: number | null
          phone_number?: string | null
          preferred_language?: string | null
          social_profiles?: Json | null
          time_zone?: string | null
          updated_at?: string | null
          user_id: number
          website?: string | null
        }
        Update: {
          acquisition_cost?: number | null
          annual_revenue?: number | null
          brand_id?: number
          company_size?: string | null
          contact_method?: string | null
          contact_person?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          customer_name?: string
          customer_source?: string | null
          customer_tags?: string | null
          customer_type?: string | null
          email?: string | null
          employee_count?: number | null
          id?: number
          industry?: string | null
          last_activity_at?: string | null
          lead_score?: number | null
          lifecycle_stage?: string | null
          lifetime_value?: number | null
          phone_number?: string | null
          preferred_language?: string | null
          social_profiles?: Json | null
          time_zone?: string | null
          updated_at?: string | null
          user_id?: number
          website?: string | null
        }
        Relationships: []
      }
      email_send_history: {
        Row: {
          brand_id: number
          created_at: string | null
          customer_id: number
          email_type: string
          id: number
          send_history: Json
          updated_at: string | null
          user_id: number
        }
        Insert: {
          brand_id: number
          created_at?: string | null
          customer_id: number
          email_type: string
          id?: number
          send_history: Json
          updated_at?: string | null
          user_id: number
        }
        Update: {
          brand_id?: number
          created_at?: string | null
          customer_id?: number
          email_type?: string
          id?: number
          send_history?: Json
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          brand_id: number
          category: string | null
          created_at: string | null
          html_content: string | null
          id: string
          is_ai_generated: boolean | null
          name: string
          performance_score: number | null
          subject_template: string
          tags: string[] | null
          text_content: string | null
          updated_at: string | null
          usage_count: number | null
          user_id: number
          variables: Json | null
        }
        Insert: {
          brand_id: number
          category?: string | null
          created_at?: string | null
          html_content?: string | null
          id?: string
          is_ai_generated?: boolean | null
          name: string
          performance_score?: number | null
          subject_template: string
          tags?: string[] | null
          text_content?: string | null
          updated_at?: string | null
          usage_count?: number | null
          user_id: number
          variables?: Json | null
        }
        Update: {
          brand_id?: number
          category?: string | null
          created_at?: string | null
          html_content?: string | null
          id?: string
          is_ai_generated?: boolean | null
          name?: string
          performance_score?: number | null
          subject_template?: string
          tags?: string[] | null
          text_content?: string | null
          updated_at?: string | null
          usage_count?: number | null
          user_id?: number
          variables?: Json | null
        }
        Relationships: []
      }
      email_tracking_events: {
        Row: {
          created_at: string | null
          email_id: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          location_data: Json | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email_id: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          location_data?: Json | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email_id?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          location_data?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_tracking_events_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      emails: {
        Row: {
          ai_insights: Json | null
          attachments: Json | null
          brand_id: number
          content: string | null
          created_at: string | null
          customer_id: number | null
          email_type: string | null
          from_email: string
          id: string
          is_read: boolean | null
          opened_at: string | null
          priority: string | null
          replied_at: string | null
          reply_to_id: string | null
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          subject: string
          tags: string[] | null
          thread_id: string | null
          to_email: string
          tracking_data: Json | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          ai_insights?: Json | null
          attachments?: Json | null
          brand_id: number
          content?: string | null
          created_at?: string | null
          customer_id?: number | null
          email_type?: string | null
          from_email: string
          id?: string
          is_read?: boolean | null
          opened_at?: string | null
          priority?: string | null
          replied_at?: string | null
          reply_to_id?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          tags?: string[] | null
          thread_id?: string | null
          to_email: string
          tracking_data?: Json | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          ai_insights?: Json | null
          attachments?: Json | null
          brand_id?: number
          content?: string | null
          created_at?: string | null
          customer_id?: number | null
          email_type?: string | null
          from_email?: string
          id?: string
          is_read?: boolean | null
          opened_at?: string | null
          priority?: string | null
          replied_at?: string | null
          reply_to_id?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          tags?: string[] | null
          thread_id?: string | null
          to_email?: string
          tracking_data?: Json | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "emails_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          a_b_test_config: Json | null
          brand_id: number
          campaign_type: string
          created_at: string | null
          email_template_id: string | null
          id: string
          name: string
          performance_metrics: Json | null
          schedule_config: Json | null
          status: string | null
          target_audience: Json | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          a_b_test_config?: Json | null
          brand_id: number
          campaign_type: string
          created_at?: string | null
          email_template_id?: string | null
          id?: string
          name: string
          performance_metrics?: Json | null
          schedule_config?: Json | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          a_b_test_config?: Json | null
          brand_id?: number
          campaign_type?: string
          created_at?: string | null
          email_template_id?: string | null
          id?: string
          name?: string
          performance_metrics?: Json | null
          schedule_config?: Json | null
          status?: string | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          email: string
          id: number
          ip_address: string | null
          is_subscribed: boolean
          source: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
          updated_at: string | null
          user_agent: string | null
          uuid: string
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email: string
          id?: number
          ip_address?: string | null
          is_subscribed?: boolean
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          uuid: string
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string
          id?: number
          ip_address?: string | null
          is_subscribed?: boolean
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          uuid?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          credits: number
          currency: string | null
          expired_at: string | null
          id: number
          interval: string | null
          order_detail: string | null
          order_no: string
          origin_amount: number | null
          paid_at: string | null
          paid_detail: string | null
          paid_email: string | null
          paypal_order_id: string | null
          product_id: string | null
          product_name: string | null
          status: string
          stripe_session_id: string | null
          sub_cycle_anchor: number | null
          sub_id: string | null
          sub_interval_count: number | null
          sub_period_end: number | null
          sub_period_start: number | null
          sub_times: number | null
          user_email: string
          user_uuid: string
          valid_months: number | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          credits: number
          currency?: string | null
          expired_at?: string | null
          id?: number
          interval?: string | null
          order_detail?: string | null
          order_no: string
          origin_amount?: number | null
          paid_at?: string | null
          paid_detail?: string | null
          paid_email?: string | null
          paypal_order_id?: string | null
          product_id?: string | null
          product_name?: string | null
          status: string
          stripe_session_id?: string | null
          sub_cycle_anchor?: number | null
          sub_id?: string | null
          sub_interval_count?: number | null
          sub_period_end?: number | null
          sub_period_start?: number | null
          sub_times?: number | null
          user_email?: string
          user_uuid?: string
          valid_months?: number | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          credits?: number
          currency?: string | null
          expired_at?: string | null
          id?: number
          interval?: string | null
          order_detail?: string | null
          order_no?: string
          origin_amount?: number | null
          paid_at?: string | null
          paid_detail?: string | null
          paid_email?: string | null
          paypal_order_id?: string | null
          product_id?: string | null
          product_name?: string | null
          status?: string
          stripe_session_id?: string | null
          sub_cycle_anchor?: number | null
          sub_id?: string | null
          sub_interval_count?: number | null
          sub_period_end?: number | null
          sub_period_start?: number | null
          sub_times?: number | null
          user_email?: string
          user_uuid?: string
          valid_months?: number | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_avatar_url: string | null
          author_name: string | null
          category_uuid: string | null
          content: string | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          featured: boolean
          id: number
          locale: string | null
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          uuid: string
        }
        Insert: {
          author_avatar_url?: string | null
          author_name?: string | null
          category_uuid?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: number
          locale?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          uuid: string
        }
        Update: {
          author_avatar_url?: string | null
          author_name?: string | null
          category_uuid?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: number
          locale?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
      social_media_accounts: {
        Row: {
          account_name: string
          account_status: string | null
          brand_id: number
          created_at: string | null
          id: number
          platform_account_id: string | null
          platform_type: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          account_name: string
          account_status?: string | null
          brand_id: number
          created_at?: string | null
          id?: number
          platform_account_id?: string | null
          platform_type?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          account_name?: string
          account_status?: string | null
          brand_id?: number
          created_at?: string | null
          id?: number
          platform_account_id?: string | null
          platform_type?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      social_media_posts: {
        Row: {
          approval_time: string | null
          brand_id: number
          content_type: string
          created_at: string | null
          id: number
          media_list: Json
          metrics: Json
          platform_id: string
          platform_name: string
          publish_time: string | null
          status: string | null
          tags: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          approval_time?: string | null
          brand_id: number
          content_type: string
          created_at?: string | null
          id?: number
          media_list: Json
          metrics: Json
          platform_id: string
          platform_name: string
          publish_time?: string | null
          status?: string | null
          tags?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          approval_time?: string | null
          brand_id?: number
          content_type?: string
          created_at?: string | null
          id?: number
          media_list?: Json
          metrics?: Json
          platform_id?: string
          platform_name?: string
          publish_time?: string | null
          status?: string | null
          tags?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      system_tags: {
        Row: {
          color: string
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          text: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          text: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          text?: string
        }
        Relationships: []
      }
      traffic_heating: {
        Row: {
          actual_traffic: number | null
          created_at: string | null
          customer_id: number
          daily_traffic: number
          end_time: string
          heating_duration: number
          id: number
          preheat_url: string
          start_time: string
          status: string | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          actual_traffic?: number | null
          created_at?: string | null
          customer_id: number
          daily_traffic: number
          end_time: string
          heating_duration: number
          id?: number
          preheat_url: string
          start_time: string
          status?: string | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          actual_traffic?: number | null
          created_at?: string | null
          customer_id?: number
          daily_traffic?: number
          end_time?: string
          heating_duration?: number
          id?: number
          preheat_url?: string
          start_time?: string
          status?: string | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          avatar: string | null
          bio: string | null
          brand_id: number
          created_at: string | null
          id: number
          name: string
          role: string | null
          social_media_accounts: Json | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          brand_id: number
          created_at?: string | null
          id?: number
          name: string
          role?: string | null
          social_media_accounts?: Json | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          brand_id?: number
          created_at?: string | null
          id?: number
          name?: string
          role?: string | null
          social_media_accounts?: Json | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          avatar_url: string | null
          company_name: string | null
          company_website: string | null
          created_at: string | null
          email: string
          email_verification_token: string | null
          email_verified_at: string | null
          id: number
          invite_code: string
          invited_by: string
          is_affiliate: boolean
          locale: string | null
          nickname: string | null
          password_hash: string | null
          password_reset_token: string | null
          plan: string
          signin_ip: string | null
          signin_openid: string | null
          signin_provider: string | null
          signin_type: string | null
          updated_at: string | null
          uuid: string
        }
        Insert: {
          auth_user_id?: string | null
          avatar_url?: string | null
          company_name?: string | null
          company_website?: string | null
          created_at?: string | null
          email: string
          email_verification_token?: string | null
          email_verified_at?: string | null
          id?: number
          invite_code?: string
          invited_by?: string
          is_affiliate?: boolean
          locale?: string | null
          nickname?: string | null
          password_hash?: string | null
          password_reset_token?: string | null
          plan?: string
          signin_ip?: string | null
          signin_openid?: string | null
          signin_provider?: string | null
          signin_type?: string | null
          updated_at?: string | null
          uuid: string
        }
        Update: {
          auth_user_id?: string | null
          avatar_url?: string | null
          company_name?: string | null
          company_website?: string | null
          created_at?: string | null
          email?: string
          email_verification_token?: string | null
          email_verified_at?: string | null
          id?: number
          invite_code?: string
          invited_by?: string
          is_affiliate?: boolean
          locale?: string | null
          nickname?: string | null
          password_hash?: string | null
          password_reset_token?: string | null
          plan?: string
          signin_ip?: string | null
          signin_openid?: string | null
          signin_provider?: string | null
          signin_type?: string | null
          updated_at?: string | null
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
