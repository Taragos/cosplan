// src/hooks.server.ts
import { env } from '$env/dynamic/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'
import type { Database } from '$lib/models/supabase'

export const handle: Handle = async ({ event, resolve }) => {
  const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = env

  if (!PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('missing supabase anon key')
  }

  if(!PUBLIC_SUPABASE_URL) {
    throw new Error('missing supabase url')
  }

  event.locals.supabase = createSupabaseServerClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
