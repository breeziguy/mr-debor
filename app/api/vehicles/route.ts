import { NextResponse } from "next/server"
import { getVehicles, createVehicle } from "@/lib/db-utils"

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const url = new URL(request.url)
    const make = url.searchParams.get("make")
    const model = url.searchParams.get("model")
    const status = url.searchParams.get("status")

    // Build filters
    const filters: any = {}
    if (make) filters.make = make
    if (model) filters.model = model
    if (status) filters.status = status

    // Fetch vehicles with filters
    const { data, error } = await getVehicles(filters)

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
      vehicles: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch vehicles: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Create vehicle
    const { data, error } = await createVehicle(body)

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
      vehicle: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to create vehicle: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
