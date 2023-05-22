export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cosplay_projects: {
        Row: {
          character: string
          current_stage: Database["public"]["Enums"]["stage"]
          current_visibility: Database["public"]["Enums"]["visibility"]
          id: number
          image: string | null
          inserted_at: string
          origin: string
          prerequisites: Json[] | null
          profile: string
          title: string
          updated_at: string
        }
        Insert: {
          character: string
          current_stage: Database["public"]["Enums"]["stage"]
          current_visibility: Database["public"]["Enums"]["visibility"]
          id?: number
          image?: string | null
          inserted_at?: string
          origin: string
          prerequisites?: Json[] | null
          profile: string
          title: string
          updated_at?: string
        }
        Update: {
          character?: string
          current_stage?: Database["public"]["Enums"]["stage"]
          current_visibility?: Database["public"]["Enums"]["visibility"]
          id?: number
          image?: string | null
          inserted_at?: string
          origin?: string
          prerequisites?: Json[] | null
          profile?: string
          title?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          inserted_at: string
          updated_at: string
          username: string
        }
        Insert: {
          id: string
          inserted_at?: string
          updated_at?: string
          username: string
        }
        Update: {
          id?: string
          inserted_at?: string
          updated_at?: string
          username?: string
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
      stage: "Planned" | "In Progress" | "Finished" | "Archived"
      visibility: "Public" | "Hide"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
