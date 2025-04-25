import { NextResponse } from "next/server"
import { getServiceAppointments, createServiceAppointment } from "@/lib/db-utils"

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url)
    const status = url.searchParams.get("status")

    // Build filters
    const filters: any = {}
    if (status) filters.status = status

    // Fetch service appointments with filters
    const { data, error } = await getServiceAppointments(filters)

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      appointments: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch service appointments: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Create service appointment
    const { data, error } = await createServiceAppointment(body)

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      appointment: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to create service appointment: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
