"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        if (!supabaseClient) {
          console.error("Supabase client not initialized")
          setIsLoading(false)
          return
        }

        const {
          data: { session },
        } = await supabaseClient.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          // Set cookie for middleware to use
          document.cookie = `admin_authenticated=true; path=/; max-age=${60 * 60 * 24}`
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Set up auth state change listener
    if (supabaseClient) {
      const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (event === "SIGNED_OUT") {
          // Delete the cookie on sign out
          document.cookie = "admin_authenticated=; path=/; max-age=0"
        } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          // Set cookie for middleware to use
          const expiresIn = 60 * 60 * 24 // 24 hours
          document.cookie = `admin_authenticated=true; path=/; max-age=${expiresIn}`
        }
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      if (!supabaseClient) {
        return { success: false, error: "Supabase client not initialized" }
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error: any) {
      console.error("Sign in error:", error)
      return { success: false, error: error?.message || "An unexpected error occurred" }
    }
  }

  const signOut = async () => {
    try {
      if (supabaseClient) {
        await supabaseClient.auth.signOut()
      }
      router.push("/admin/login")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
