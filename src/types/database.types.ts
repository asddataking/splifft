export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      fresh_hit_bookings: {
        Row: {
          addon_ids: string[];
          appointment_slot: string | null;
          cleaning_tier_id: string;
          cleaning_tier_label: string;
          created_at: string;
          customer_email: string | null;
          customer_name: string | null;
          customer_notes: string | null;
          customer_phone: string | null;
          id: string;
          is_member_preview: boolean;
          payment_notes: string | null;
          piece_quantity: number;
          service_address: string | null;
          service_price_cents: number;
          status: string;
          total_cents: number;
          user_id: string | null;
        };
        Insert: {
          addon_ids?: string[];
          appointment_slot?: string | null;
          cleaning_tier_id: string;
          cleaning_tier_label: string;
          created_at?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_notes?: string | null;
          customer_phone?: string | null;
          id?: string;
          is_member_preview?: boolean;
          payment_notes?: string | null;
          piece_quantity?: number;
          service_address?: string | null;
          service_price_cents: number;
          status?: string;
          total_cents: number;
          user_id?: string | null;
        };
        Update: {
          addon_ids?: string[];
          appointment_slot?: string | null;
          cleaning_tier_id?: string;
          cleaning_tier_label?: string;
          created_at?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_notes?: string | null;
          customer_phone?: string | null;
          id?: string;
          is_member_preview?: boolean;
          payment_notes?: string | null;
          piece_quantity?: number;
          service_address?: string | null;
          service_price_cents?: number;
          status?: string;
          total_cents?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      event_quote_requests: {
        Row: {
          created_at: string;
          event_date: string;
          event_type: string;
          guest_count: number;
          id: string;
          status: string;
          upsell_ids: string[];
          venue_location: string;
        };
        Insert: {
          created_at?: string;
          event_date: string;
          event_type: string;
          guest_count: number;
          id?: string;
          status?: string;
          upsell_ids?: string[];
          venue_location: string;
        };
        Update: {
          created_at?: string;
          event_date?: string;
          event_type?: string;
          guest_count?: number;
          id?: string;
          status?: string;
          upsell_ids?: string[];
          venue_location?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          active: boolean;
          badge: string | null;
          created_at: string;
          description: string;
          highlights: Json;
          id: string;
          member_price_cents: number;
          name: string;
          price_cents: number;
          slug: string;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          badge?: string | null;
          created_at?: string;
          description: string;
          highlights?: Json;
          id: string;
          member_price_cents: number;
          name: string;
          price_cents: number;
          slug: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          badge?: string | null;
          created_at?: string;
          description?: string;
          highlights?: Json;
          id?: string;
          member_price_cents?: number;
          name?: string;
          price_cents?: number;
          slug?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      roll_up_bookings: {
        Row: {
          appointment_slot: string | null;
          created_at: string;
          customer_email: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          estimated_rolls: number;
          flower_grams: number;
          id: string;
          infusion: string | null;
          is_member_preview: boolean;
          payment_notes: string | null;
          roll_size_grams: number;
          roll_size_label: string;
          roll_style: string | null;
          service_address: string | null;
          service_price_cents: number;
          status: string;
          tier_use_case: string | null;
          total_cents: number;
          upgrade_ids: string[];
          upgrades_total_cents: number;
          user_id: string | null;
        };
        Insert: {
          appointment_slot?: string | null;
          created_at?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          estimated_rolls: number;
          flower_grams: number;
          id?: string;
          infusion?: string | null;
          is_member_preview?: boolean;
          payment_notes?: string | null;
          roll_size_grams: number;
          roll_size_label: string;
          roll_style?: string | null;
          service_address?: string | null;
          service_price_cents: number;
          status?: string;
          tier_use_case?: string | null;
          total_cents: number;
          upgrade_ids?: string[];
          upgrades_total_cents?: number;
          user_id?: string | null;
        };
        Update: {
          appointment_slot?: string | null;
          created_at?: string;
          customer_email?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          estimated_rolls?: number;
          flower_grams?: number;
          id?: string;
          infusion?: string | null;
          is_member_preview?: boolean;
          payment_notes?: string | null;
          roll_size_grams?: number;
          roll_size_label?: string;
          roll_style?: string | null;
          service_address?: string | null;
          service_price_cents?: number;
          status?: string;
          tier_use_case?: string | null;
          total_cents?: number;
          upgrade_ids?: string[];
          upgrades_total_cents?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
