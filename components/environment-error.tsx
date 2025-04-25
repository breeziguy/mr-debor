"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EnvironmentError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            The application is missing required environment variables for Supabase integration.
          </AlertDescription>
        </Alert>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">Missing Environment Variables</h1>
          <p className="mb-4">
            This application requires Supabase environment variables to function properly. Please make sure the
            following environment variables are set in your Vercel project:
          </p>

          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>NEXT_PUBLIC_SUPABASE_URL</li>
            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            <li>SUPABASE_SERVICE_ROLE_KEY</li>
          </ul>

          <div className="flex flex-col space-y-2">
            <Button asChild>
              <Link href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                Go to Vercel Dashboard
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
