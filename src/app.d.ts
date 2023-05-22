// src/app.d.ts

import type { Database } from '$lib/models/supabase'
import { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }
}
