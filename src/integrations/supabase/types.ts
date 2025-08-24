export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          api_key: string
          created_at: string
          id: string
          is_active: boolean | null
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      icp_b2b_profiles: {
        Row: {
          adoption_intent_signals: boolean | null
          annual_revenue_max: number | null
          annual_revenue_min: number | null
          business_model: string | null
          buying_power: string | null
          company_age: number | null
          company_size_max: number | null
          company_size_min: number | null
          competitor_overlap: string[] | null
          created_at: string | null
          departments: string[] | null
          exclusion_criteria: Json | null
          growth_stage: string | null
          hiring_trends: boolean | null
          hq_location: string | null
          icp_configuration_id: string
          id: string
          industry: string | null
          job_titles: string[] | null
          online_presence: string | null
          operating_regions: string[] | null
          ownership_type: string | null
          pain_points: string[] | null
          preferred_channels: string[] | null
          recent_news: string | null
          seniority_levels: string[] | null
          sub_industry: string | null
          tech_stack: string[] | null
          technology_maturity: string | null
          updated_at: string | null
        }
        Insert: {
          adoption_intent_signals?: boolean | null
          annual_revenue_max?: number | null
          annual_revenue_min?: number | null
          business_model?: string | null
          buying_power?: string | null
          company_age?: number | null
          company_size_max?: number | null
          company_size_min?: number | null
          competitor_overlap?: string[] | null
          created_at?: string | null
          departments?: string[] | null
          exclusion_criteria?: Json | null
          growth_stage?: string | null
          hiring_trends?: boolean | null
          hq_location?: string | null
          icp_configuration_id: string
          id?: string
          industry?: string | null
          job_titles?: string[] | null
          online_presence?: string | null
          operating_regions?: string[] | null
          ownership_type?: string | null
          pain_points?: string[] | null
          preferred_channels?: string[] | null
          recent_news?: string | null
          seniority_levels?: string[] | null
          sub_industry?: string | null
          tech_stack?: string[] | null
          technology_maturity?: string | null
          updated_at?: string | null
        }
        Update: {
          adoption_intent_signals?: boolean | null
          annual_revenue_max?: number | null
          annual_revenue_min?: number | null
          business_model?: string | null
          buying_power?: string | null
          company_age?: number | null
          company_size_max?: number | null
          company_size_min?: number | null
          competitor_overlap?: string[] | null
          created_at?: string | null
          departments?: string[] | null
          exclusion_criteria?: Json | null
          growth_stage?: string | null
          hiring_trends?: boolean | null
          hq_location?: string | null
          icp_configuration_id?: string
          id?: string
          industry?: string | null
          job_titles?: string[] | null
          online_presence?: string | null
          operating_regions?: string[] | null
          ownership_type?: string | null
          pain_points?: string[] | null
          preferred_channels?: string[] | null
          recent_news?: string | null
          seniority_levels?: string[] | null
          sub_industry?: string | null
          tech_stack?: string[] | null
          technology_maturity?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_icp_b2b_profiles_configuration"
            columns: ["icp_configuration_id"]
            isOneToOne: false
            referencedRelation: "icp_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      icp_b2c_profiles: {
        Row: {
          age_max: number | null
          age_min: number | null
          brand_loyalty: string | null
          created_at: string | null
          device_preferences: string[] | null
          digital_engagement: string | null
          education_level: string[] | null
          exclusion_criteria: Json | null
          gender: string[] | null
          icp_configuration_id: string
          id: string
          income_max: number | null
          income_min: number | null
          interests: string[] | null
          lifestyle: string[] | null
          location: string[] | null
          motivations: string[] | null
          occupation: string[] | null
          pain_points: string[] | null
          personality_traits: string[] | null
          preferred_communication: string[] | null
          purchase_behavior: string[] | null
          shopping_preferences: string[] | null
          social_media_platforms: string[] | null
          tech_savviness: string | null
          updated_at: string | null
          urban_rural_preference: string | null
          values: string[] | null
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          brand_loyalty?: string | null
          created_at?: string | null
          device_preferences?: string[] | null
          digital_engagement?: string | null
          education_level?: string[] | null
          exclusion_criteria?: Json | null
          gender?: string[] | null
          icp_configuration_id: string
          id?: string
          income_max?: number | null
          income_min?: number | null
          interests?: string[] | null
          lifestyle?: string[] | null
          location?: string[] | null
          motivations?: string[] | null
          occupation?: string[] | null
          pain_points?: string[] | null
          personality_traits?: string[] | null
          preferred_communication?: string[] | null
          purchase_behavior?: string[] | null
          shopping_preferences?: string[] | null
          social_media_platforms?: string[] | null
          tech_savviness?: string | null
          updated_at?: string | null
          urban_rural_preference?: string | null
          values?: string[] | null
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          brand_loyalty?: string | null
          created_at?: string | null
          device_preferences?: string[] | null
          digital_engagement?: string | null
          education_level?: string[] | null
          exclusion_criteria?: Json | null
          gender?: string[] | null
          icp_configuration_id?: string
          id?: string
          income_max?: number | null
          income_min?: number | null
          interests?: string[] | null
          lifestyle?: string[] | null
          location?: string[] | null
          motivations?: string[] | null
          occupation?: string[] | null
          pain_points?: string[] | null
          personality_traits?: string[] | null
          preferred_communication?: string[] | null
          purchase_behavior?: string[] | null
          shopping_preferences?: string[] | null
          social_media_platforms?: string[] | null
          tech_savviness?: string | null
          updated_at?: string | null
          urban_rural_preference?: string | null
          values?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_icp_b2c_profiles_configuration"
            columns: ["icp_configuration_id"]
            isOneToOne: false
            referencedRelation: "icp_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      icp_configurations: {
        Row: {
          created_at: string | null
          customer_type: string
          description: string | null
          id: string
          is_active: boolean | null
          knowledge_base_id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_type: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          knowledge_base_id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_type?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          knowledge_base_id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_icp_configurations_knowledge_base"
            columns: ["knowledge_base_id"]
            isOneToOne: false
            referencedRelation: "knowledge_bases"
            referencedColumns: ["id"]
          },
        ]
      }
      icps: {
        Row: {
          additional_criteria: Json | null
          budget_range: string | null
          company_size: string[] | null
          created_at: string
          id: string
          industry: string[] | null
          knowledge_base_id: string
          pain_points: string[] | null
          regions: string[] | null
          target_roles: string[] | null
          updated_at: string
        }
        Insert: {
          additional_criteria?: Json | null
          budget_range?: string | null
          company_size?: string[] | null
          created_at?: string
          id?: string
          industry?: string[] | null
          knowledge_base_id: string
          pain_points?: string[] | null
          regions?: string[] | null
          target_roles?: string[] | null
          updated_at?: string
        }
        Update: {
          additional_criteria?: Json | null
          budget_range?: string | null
          company_size?: string[] | null
          created_at?: string
          id?: string
          industry?: string[] | null
          knowledge_base_id?: string
          pain_points?: string[] | null
          regions?: string[] | null
          target_roles?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "icps_knowledge_base_id_fkey"
            columns: ["knowledge_base_id"]
            isOneToOne: false
            referencedRelation: "knowledge_bases"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_base_files: {
        Row: {
          ai_generated_summary: string | null
          ai_generated_title: string | null
          ai_processed_at: string | null
          ai_processing_status: string | null
          content_summary: string | null
          created_at: string
          extracted_text: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          knowledge_base_id: string
          markdown_content: string | null
          processing_error: string | null
          status: string
          storage_path: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_generated_summary?: string | null
          ai_generated_title?: string | null
          ai_processed_at?: string | null
          ai_processing_status?: string | null
          content_summary?: string | null
          created_at?: string
          extracted_text?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          knowledge_base_id: string
          markdown_content?: string | null
          processing_error?: string | null
          status?: string
          storage_path: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_generated_summary?: string | null
          ai_generated_title?: string | null
          ai_processed_at?: string | null
          ai_processing_status?: string | null
          content_summary?: string | null
          created_at?: string
          extracted_text?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          knowledge_base_id?: string
          markdown_content?: string | null
          processing_error?: string | null
          status?: string
          storage_path?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      knowledge_bases: {
        Row: {
          analysis_status: string | null
          analyzed_at: string | null
          business_overview: Json | null
          created_at: string
          description: string | null
          icp_description: Json | null
          id: string
          linkedin_url: string | null
          name: string
          status: string | null
          updated_at: string
          uploaded_file_url: string | null
          user_id: string
          value_proposition: Json | null
          website_url: string | null
        }
        Insert: {
          analysis_status?: string | null
          analyzed_at?: string | null
          business_overview?: Json | null
          created_at?: string
          description?: string | null
          icp_description?: Json | null
          id?: string
          linkedin_url?: string | null
          name: string
          status?: string | null
          updated_at?: string
          uploaded_file_url?: string | null
          user_id: string
          value_proposition?: Json | null
          website_url?: string | null
        }
        Update: {
          analysis_status?: string | null
          analyzed_at?: string | null
          business_overview?: Json | null
          created_at?: string
          description?: string | null
          icp_description?: Json | null
          id?: string
          linkedin_url?: string | null
          name?: string
          status?: string | null
          updated_at?: string
          uploaded_file_url?: string | null
          user_id?: string
          value_proposition?: Json | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prospects: {
        Row: {
          company: string
          company_size: string | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          is_priority: boolean | null
          knowledge_base_id: string
          linkedin_url: string | null
          location: string | null
          match_reasons: string[] | null
          name: string
          notes: string | null
          phone: string | null
          position: string | null
          score: number | null
          source: string | null
          updated_at: string
        }
        Insert: {
          company: string
          company_size?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_priority?: boolean | null
          knowledge_base_id: string
          linkedin_url?: string | null
          location?: string | null
          match_reasons?: string[] | null
          name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          score?: number | null
          source?: string | null
          updated_at?: string
        }
        Update: {
          company?: string
          company_size?: string | null
          created_at?: string
          email?: string | null
          id?: string
          industry?: string | null
          is_priority?: boolean | null
          knowledge_base_id?: string
          linkedin_url?: string | null
          location?: string | null
          match_reasons?: string[] | null
          name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          score?: number | null
          source?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospects_knowledge_base_id_fkey"
            columns: ["knowledge_base_id"]
            isOneToOne: false
            referencedRelation: "knowledge_bases"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
