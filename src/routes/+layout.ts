// src/routes/+layout.ts
import { env  } from '$env/dynamic/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } = env;

  if (!PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('missing supabase anon key')
  }

  if(!PUBLIC_SUPABASE_URL) {
    throw new Error('missing supabase url')
  }

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}
