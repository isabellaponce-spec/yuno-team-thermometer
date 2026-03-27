import { createClient } from '@supabase/supabase-js'

let anonClient: ReturnType<typeof createClient> | null = null
let serviceClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!anonClient) {
    anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return anonClient
}

export function createServiceClient() {
  if (!serviceClient) {
    serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return serviceClient
}
