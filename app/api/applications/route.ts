import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Fetch all applications
    const { data: applications, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching applications:", error)
      return NextResponse.json(
        {
          success: false,
          error: `Error fetching applications: ${error.message}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      applications: applications || [],
    })
  } catch (error: any) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch applications: ${error?.message || "Unknown error"}`,
        applications: [],
      },
      { status: 500 },
    )
  }
}
