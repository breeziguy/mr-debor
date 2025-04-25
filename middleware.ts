import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  try {
    // Check if the request is for the admin area
    if (request.nextUrl.pathname.startsWith("/admin")) {
      // Skip authentication for the login page and setup page
      if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname === "/admin/setup") {
        return NextResponse.next()
      }

      // Check if the user is authenticated using the cookie
      const isAuthenticated = request.cookies.has("admin_authenticated")

      if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Always allow the request to continue in case of errors
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
