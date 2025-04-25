import { createClient } from "@supabase/supabase-js"

// Initialize the Supabase client with proper error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if required environment variables are available
if (!supabaseUrl) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseAnonKey) {
  console.error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

if (!supabaseServiceKey) {
  console.error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY")
}

// Client-side Supabase client (limited permissions)
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client or throw a more descriptive error
    console.error("Cannot initialize Supabase client: missing required environment variables")

    // Return a mock client that will show a clear error message if used
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      // Add other methods as needed with appropriate error handling
      from: () => ({
        select: () =>
          Promise.reject(new Error("Supabase client not properly initialized due to missing environment variables")),
      }),
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Server-side Supabase client with admin privileges
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: false,
        },
      })
    : null

// Client singleton
let clientSingleton: ReturnType<typeof createClient> | null = null

// Export the client for direct use in client components
export const supabaseClient =
  typeof window !== "undefined" ? (clientSingleton ?? (clientSingleton = getSupabaseClient())) : getSupabaseClient() // This will be re-created on each render on the server, but that's fine
