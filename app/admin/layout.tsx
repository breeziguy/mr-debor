"use client"

import type React from "react"

import Link from "next/link"
import { FileText, Home, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut, isLoading } = useAuth()
  const pathname = usePathname()

  // Skip auth check on login page
  if (pathname === "/admin/login") {
    return children
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user && typeof window !== "undefined") {
    window.location.href = "/admin/login"
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold">DropTop Admin</span>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <Link
                href="/admin/applications"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname.includes("/applications") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <FileText className="mr-3 h-6 w-6" />
                Applications
              </Link>
              <Link
                href="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Home className="mr-3 h-6 w-6" />
                Back to Website
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => signOut()}
              >
                <LogOut className="mr-3 h-6 w-6" />
                Sign Out
              </Button>
            </nav>
          </div>
          {user && (
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.email}</p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  )
}
