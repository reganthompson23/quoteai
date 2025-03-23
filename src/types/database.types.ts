export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string
          business_id: string
          messages: Json[]
          summary: string
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          messages: Json[]
          summary: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          messages?: Json[]
          summary?: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          business_id: string
          title: string
          description: string
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          title: string
          description: string
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          title?: string
          description?: string
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      pricing_rules: {
        Row: {
          id: string
          business_id: string
          title: string
          description: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          title: string
          description: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          title?: string
          description?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
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
  }
} 