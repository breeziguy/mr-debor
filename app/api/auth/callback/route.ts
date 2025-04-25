import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(request: Request) {
  // Get the code from the query string
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (code) {
    const { error } = await supabaseAdmin.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Error exchanging code for session:", error)
      return NextResponse.redirect(new URL("/admin/login?error=auth", url.origin))
    }

    // Redirect to admin page
    return NextResponse.redirect(new URL("/admin", url.origin))
  }

  // If no code, redirect to login
  return NextResponse.redirect(new URL("/admin/login", url.origin))
}
