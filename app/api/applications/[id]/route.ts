import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getFileUrl } from "@/lib/storage-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Fetch the application
    const { data: application, error } = await supabaseAdmin.from("applications").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching application:", error)
      return NextResponse.json(
        {
          success: false,
          error: `Error fetching application: ${error.message}`,
        },
        { status: 500 },
      )
    }

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          error: "Application not found",
        },
        { status: 404 },
      )
    }

    // Get signed URLs for the ID documents if they exist
    let idFrontUrl = null
    let idBackUrl = null

    if (application.id_front_path) {
      const { url } = await getFileUrl("id_documents", application.id_front_path, 3600) // 1 hour expiry
      idFrontUrl = url
    }

    if (application.id_back_path) {
      const { url } = await getFileUrl("id_documents", application.id_back_path, 3600) // 1 hour expiry
      idBackUrl = url
    }

    return NextResponse.json({
      success: true,
      application,
      idFrontUrl,
      idBackUrl,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch application: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
